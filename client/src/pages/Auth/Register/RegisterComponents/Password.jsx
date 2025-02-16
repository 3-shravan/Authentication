import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdLock, MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import styles from "../../AuthComponents.module.css";
import AuthButton from "../../../../components/UI/AuthButton";
import GoToLogin from "./GoToLogin";

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
        <h1 className={styles.heading2}>
          Create a secure password.{" "}
        </h1>
        <h2 className={styles.inputName}>Password</h2>
        <div className={styles.inputWrapper}>
        <MdLock className="text-3xl absolute left-2.5 text-zinc-100 pr-2  border-zinc-700 h-6 " />

          <input
            ref={inputRef}
            type="password"
            placeholder="  Password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
          />
        </div>
      </motion.div>
      <AuthButton handleNext={handleNext} text="Next" register={true}
      icon={<MdNavigateNext />} />
      <GoToLogin />

    </>
  );
};

export default Password;
