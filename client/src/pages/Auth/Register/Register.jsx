import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./Register.module.css";
import Fullname from "../../../components/AuthComponents/Fullname";
import Password from "../../../components/AuthComponents/Password";
import VerifyPhoneEmail from "../../../components/AuthComponents/VerifyPhoneEmail";
import VerifyOTP from "../../../components/AuthComponents/VerifyOTP";
import Button from "../../../components/AuthComponents/Button";
import { errorToast, successToast } from "../../../utils/ToastNotifications";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  verificationMethod: "email",
};

const Register = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (stage === 1 && !formData.name.trim())
      return errorToast("Please provide your name.");

    if (stage === 2 && formData.password.length < 6)
      return errorToast("Password must be 6 characters long.");

    setStage(stage + 1);
  };

  const handlePrevious = (e) => {
    setStage(stage - 1);
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(String(phone));

  const submitHandler = async (e) => {
    e.preventDefault();

    if (stage === 3) {
      if (
        formData.verificationMethod === "email" &&
        !isValidEmail(formData.email)
      ) {
        return errorToast("Please provide a valid email address.");
      }
      if (
        formData.verificationMethod === "phone" &&
        !isValidPhone(formData.phone)
      ) {
        return errorToast("Please provide a valid phone number.");
      }
      if (!formData.email.trim() && !formData.phone.trim()) {
        return errorToast("Please provide phone or email for verification.");
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData
      );
      if (response.status === 200) {
        successToast("verification code sent.");
        handleNext();
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Registration failed.");
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
              <Button handleNext={submitHandler} text="Send OTP" />
            </>
          )}

          {stage === 4 && (
            <VerifyOTP
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          )}
        </form>
      </motion.div>
    </>
  );
};
export default Register;
