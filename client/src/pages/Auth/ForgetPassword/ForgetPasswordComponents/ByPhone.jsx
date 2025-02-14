import React from "react";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import styles from "../../AuthComponents.module.css";

const ByPhone = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "circIn" }}
    >
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
    </motion.div>
  );
};

export default ByPhone;
