import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import styles from "./AuthComponent.module.css";
import Button from "./Button";

const Fullname = ({ handleNext, formData, handleChange }) => {
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
          <CgProfile className={styles.icon} />
          <input
            required
            type="text"
            placeholder=" Fullname"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            className={styles.inputField}
          />
        </div>
      </motion.div>
      <Button handleNext={handleNext} text="Next" />
    </>
  );
};

export default Fullname;
