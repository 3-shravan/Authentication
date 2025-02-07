import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./AuthComponent.module.css";
import Button from "./Button";
import { useEffect, useRef } from "react";

const Password = ({ handleNext, formData, handleChange, handlePrevious }) => {
  const inputRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
      >
        <h1 className={styles.heading1}>
          <IoIosArrowBack
            onClick={handlePrevious}
            className={styles.backIcon}
          />
        </h1>
        <h1 className={`${styles.heading1} ${styles.heading2}`}>
          Create a password{" "}
        </h1>
        <h2 className={styles.inputName}>Password</h2>
        <div className={styles.inputWrapper}>
          <FaLock className={styles.lockIcon} />

          <input
            ref={inputRef}
            type="password"
            placeholder=" Password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
          />
        </div>
      </motion.div>
      <Button handleNext={handleNext} text="Next" />
    </>
  );
};

export default Password;
