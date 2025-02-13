import React from "react";

import { motion } from "framer-motion";
import { errorToast, successToast } from "../../../utils/ToastNotifications";
import { useApi } from "../../../hooks/useApi";
import { RegisterInitialFormData } from "../../../utils/Constants";
import { validateForm } from "../../../utils/Validation";

import styles from "./Register.module.css";
import Fullname from "./RegisterComponents/Fullname";
import Password from "./RegisterComponents/Password";
import VerifyPhoneEmail from "./RegisterComponents/VerifyPhoneEmail";
import VerifyOTP from "./VerifyOTP";
import AuthButton from "../../../components/UI/AuthButton";
import Footer from "./RegisterComponents/Footer";
import GoToLogin from './RegisterComponents/GoToLogin'

const Register = () => {
  const [stage, setStage] = React.useState(1);
  const [formData, setFormData] = React.useState(RegisterInitialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (stage === 1 && !formData.name.trim())
      return errorToast("Please provide your name.");

    if (stage === 2 && formData.password.length < 6)
      return errorToast("Password must be 6 characters long.");

    setStage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStage((prev) => prev - 1);
  };

  const { execute, loading, data, error } = useApi("/register", "POST");

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validateForm(formData, stage);
    if (validationError) {
      return errorToast(validationError);
    }

    const response = await execute(formData);

    if (response.status === 200) {
      handleNext();
    }
  };

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
      >
        <form
          action=""
          className={styles.formContainer}
          onSubmit={(e) => submitHandler(e)}
        >
          {stage === 1 && (
            <Fullname
              handleNext={handleNext}
              formData={formData}
              handleChange={handleChange}
            />
          )}

          {stage === 2 && (
            <Password
              handleNext={handleNext}
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          )}

          {stage === 3 && (
            <>
              <VerifyPhoneEmail
                handleNext={handleNext}
                formData={formData}
                handleChange={handleChange}
                handlePrevious={handlePrevious}
                submitHandler={submitHandler}
              />
              <AuthButton
                handleNext={submitHandler}
                text="Send OTP"
                loading={loading}
                register={true}
              />
              <GoToLogin />
            </>
          )}
        </form>

        {stage === 4 && (
          <div className={styles.formContainer}>
            <VerifyOTP
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          </div>
        )}

        <Footer />
      </motion.div>
    </>
  );
};
export default Register;
