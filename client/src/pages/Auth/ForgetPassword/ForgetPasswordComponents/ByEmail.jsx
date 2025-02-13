import React from "react";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import styles from "../../AuthComponents.module.css";

const ByEmail = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      {/* <h2 className={styles.inputName}>Email</h2> */}
      <div className={styles.inputWrapper}>
        <CgProfile className={styles.icon} />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </motion.div>
  );
};

export default ByEmail;
