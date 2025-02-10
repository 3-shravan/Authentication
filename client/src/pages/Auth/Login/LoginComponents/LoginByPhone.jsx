import React from "react";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import styles from "./LoginComponents.module.css";

const LoginByPhone = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      <h2 className={styles.inputName}>Phone Number</h2>
      <div className={styles.inputWrapper}>
        <CgProfile className={styles.icon} />
        <input
          type="number"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>

      <h2 className={styles.inputName}>Password</h2>
      <div className={styles.inputWrapper}>
        <CgProfile className={styles.icon} />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </motion.div>
  );
};

export default LoginByPhone;
