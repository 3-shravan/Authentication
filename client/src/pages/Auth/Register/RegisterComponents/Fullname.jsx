import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";

import styles from "../../AuthComponents.module.css";
import AuthButton from "../../../../components/UI/AuthButton";
import GoToLogin from "./GoToLogin";
import { MdNavigateNext } from "react-icons/md";

const Fullname = ({ handleNext, formData, handleChange }) => {
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
        <h1 className={styles.heading1}>Create New Account</h1>
        <h1 className={` ${styles.heading2}`}>Join today!</h1>
        <h2 className={styles.inputName}>What's your name</h2>
        <div className={styles.inputWrapper}>
          <CgProfile className="text-3xl absolute left-2.5 text-zinc-300 pr-2 border-r-1 border-zinc-700 h-7 mx-auto" />
          <input
            ref={inputRef}
            type="text"
            placeholder="  Fullname"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
          />
        </div>
      </motion.div>
      <AuthButton
        handleNext={handleNext}
        text="Next"
        type="button"
        register={true}
        icon={<MdNavigateNext />}
      />
      <GoToLogin />
    </>
  );
};

export default Fullname;
