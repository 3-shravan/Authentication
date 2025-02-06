import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./AuthComponent.module.css";

const VerifyOTP = ({ handleChange, handlePrevious }) => {
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
          <div className={styles.boxes}></div>
          <div className={styles.boxes}></div>
          <div className={styles.boxes}></div>
          <div className={styles.boxes}></div>
          <div className={styles.boxes}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyOTP;
