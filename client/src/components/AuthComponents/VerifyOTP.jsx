import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./AuthComponent.module.css";
import InputOtp from "./InputOtp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { errorToast, successToast } from "../../utils/ToastNotifications";

const VerifyOTP = ({ formData, handlePrevious }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const phone = formData.phone ? `+91${formData.phone}` : "";

  const handleOtpSubmit = async (otp) => {
    const requestData = {
      email: formData.email,
      phone: formData.phone,
      otp,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/verifyotp",
        requestData
      );
      if (response.status === 200) {
        successToast(response.data.message);
        navigate("/feeds");
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to verify");
    } finally {
      setLoading(false);
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
            onClick={handlePrevious}
            className={styles.backIcon}
          />
        </h1>
        <h1 className={`${styles.heading1} ${styles.heading2}`}>
          Verification Code
        </h1>
        <h2 className={styles.inputName}>
          We sent you a Verification Code on{" "}
          <span className={styles.email}>
            {phone} {formData.email}.
          </span>
        </h2>

        <InputOtp handleOtpSubmit={handleOtpSubmit} loading={loading} />
      </form>
    </motion.div>
  );
};

export default VerifyOTP;
