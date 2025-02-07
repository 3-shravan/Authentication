import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./AuthComponent.module.css";
import { useState } from "react";

const VerifyOTP = ({ handleChange, handlePrevious }) => {
  const [otp, setOtp] = useState(new Array(5).fill(""));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      <h1 className={styles.heading1}>
        <IoIosArrowBack onClick={handlePrevious} className={styles.backIcon} />
      </h1>
      <h1 className={`${styles.heading1} ${styles.heading2}`}>
        We sent you a Verification Code
      </h1>
      <h2 className={styles.inputName}>Verification Code</h2>
      <div className={styles.inputWrapper}>
        <div className={styles.boxesContainer}>
          {otp.map((data, index) => (
            <input
              className={styles.boxes}
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyOTP;
