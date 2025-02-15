import React from "react";
import { motion } from "framer-motion";
import styles from "../../AuthComponents.module.css";
import { FaPlus } from "react-icons/fa6";
import { TbNumber91Small } from "react-icons/tb";

const ByPhone = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "circIn" }}
    >
      <div className={styles.inputWrapper}>
        <FaPlus className="text-sm absolute left-2 text-zinc-300 pr-2  border-zinc-700 h-7 mx-auto" />
        <TbNumber91Small className="text-3xl absolute left-2.5 text-zinc-300 pr-1 border-r-1 border-zinc-700 h-7 mx-auto" />
        <input
          type="number"
          placeholder="  Phone Number"
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
