import React from "react";
import { motion } from "framer-motion";
import { useApi } from "../../../hooks/useApi";
import ByEmail from "./ForgetPasswordComponents/ByEmail";
import ByPhone from "./ForgetPasswordComponents/ByPhone";
import styles from "./ForgetPassword.module.css";
import Button from "../../../components/UI/Button";
import VerifyOtp from "./ForgetPasswordComponents/VerifyOtp";
import { errorToast } from "../../../utils/ToastNotifications";
import { isValidEmail, isValidPhone } from "../../../utils/Validation";

const initialData = {
  email: "",
  phone: "",
};

const ForgetPassword = () => {
  const [byEmail, setByEmail] = React.useState(true);
  const [formData, setFormData] = React.useState(initialData);
  const [stage, setStage] = React.useState(0);

  const { execute, loading } = useApi("/forgetPassword", "POST");

  const handleMethod = () => {
    if (byEmail) {
      formData.email = "";
    } else formData.phone = "";

    setByEmail(!byEmail);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (byEmail && (!formData.email.trim() || !isValidEmail(formData.email))) {
      errorToast("Provide a valid Email address");
      return;
    }
    if (!byEmail && (!formData.phone.trim() || !isValidPhone(formData.phone))) {
      errorToast("Provide a valid Phone number");
      return;
    }
    console.log(formData);

    const response = await execute(formData);
    console.log(response);

    !byEmail && setStage(1);
  };

  return (
    <div>
      <div className={styles.container}>
        <form
          action=""
          className={styles.formContainer}
          onSubmit={(e) => submitHandler(e)}
        >
          {stage === 0 && (
            <>
              <h1 className={` ${styles.heading2}`}>
                Reset your password by verifying yourself.
              </h1>

              {byEmail ? (
                <>
                  <ByEmail handleChange={handleChange} formData={formData} />
                  <Button
                    text="Send"
                    type="button"
                    handleNext={submitHandler}
                    loading={loading}
                  />
                </>
              ) : (
                <>
                  <ByPhone handleChange={handleChange} formData={formData} />
                  <Button
                    text="Send OTP"
                    type="button"
                    handleNext={submitHandler}
                    loading={loading}
                  />
                </>
              )}

              <span className={styles.spanLine} onClick={() => handleMethod()}>
                Try another way
              </span>
            </>
          )}
        </form>
        <motion.div className={styles.formContainer}>
          {stage === 1 && <VerifyOtp formData={formData} setStage={setStage} />}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgetPassword;
