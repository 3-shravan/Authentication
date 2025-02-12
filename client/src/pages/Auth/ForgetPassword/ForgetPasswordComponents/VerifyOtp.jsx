import React from "react";

import { useApi } from "../../../../hooks/useApi";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

import InputOtp from "../../../../components/InputOtp/InputOtp";
import styles from "../../AuthComponents.module.css";

const VerifyOtp = ({ formData, setStage }) => {
  const phone = `+91${" "}${formData.phone}`;
  const { execute, loading } = useApi(
    "/forgetPassword/verifyOTP",
    "POST",
    "/login"
  );

  const handleOtpSubmit = async (otp) => {
    const requestData = {
      phone: formData.phone,
      otp,
    };
    console.log(requestData);
    const response = await execute(requestData);
    if (response.status === 200) {
      console.log("now comapare Password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      <form
        action=""
        className={styles.formContainer}
        onSubmit={(e) => {
          handleOtpSubmit(e);
        }}
      >
        <h1 className={styles.heading1}>
          <IoIosArrowBack
            onClick={() => setStage(0)}
            className={styles.backIcon}
          />
        </h1>
        <h1 className={`${styles.heading1} ${styles.heading2}`}>
          Verification Code
        </h1>
        <h2 className={styles.inputName}>
          We sent you a Verification Code on
          {phone}
        </h2>

        <InputOtp handleOtpSubmit={handleOtpSubmit} loading={loading} />
      </form>
    </motion.div>
  );
};

export default VerifyOtp;
