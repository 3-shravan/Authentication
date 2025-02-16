import { motion } from "framer-motion";
import { TbNumber91Small } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef } from "react";

import styles from "../../AuthComponents.module.css";

const VerifyPhoneEmail = ({ formData, handleChange, handlePrevious }) => {
  const inputRef = useRef(null);

  const handleEmail = () => {
    formData.phone = "";
    handleChange({
      target: { name: "verificationMethod", value: "email" },
    });
  };

  const handlePhone = () => {
    formData.email = "";
    handleChange({
      target: { name: "verificationMethod", value: "phone" },
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [formData.verificationMethod]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      <h1 className={styles.heading1}>
        <IoIosArrowBack className={styles.backIcon} onClick={handlePrevious} />
      </h1>
      <h1 className={`${styles.heading1} ${styles.heading2}`}>
        Let us verify you !
      </h1>
      <div className={styles.selectionContainer}>
        <span
          className={`${styles.selectionButton} ${
            formData.verificationMethod === "email" ? styles.active : ""
          }`}
          onClick={() => {
            handleEmail();
          }}
        >
          Email
        </span>
        <span
          type="button"
          className={`${styles.selectionButton} ${
            formData.verificationMethod === "phone" ? styles.active : ""
          }`}
          onClick={() => handlePhone()}
        >
          Phone
        </span>
      </div>

      {formData.verificationMethod === "email" && (
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ease: "linear" }}
        >
          <h2 className={styles.inputName}>By Email</h2>
          <div className={styles.inputWrapper}>
            <MdMarkEmailUnread className="text-[1.7rem] absolute left-3 text-zinc-300 pr-2  border-zinc-700 h-7 mx-auto" />

            <input
              ref={inputRef}
              type="email"
              placeholder="  Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </motion.div>
      )}
      {formData.verificationMethod === "phone" && (
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ease: "linear" }}
        >
          <h2 className={styles.inputName}>By Phone Number</h2>
          <div className={styles.inputWrapper}>
            <FaPlus className="text-sm absolute left-2 text-zinc-300 pr-2  border-zinc-700 h-7 mx-auto" />

            <TbNumber91Small className="text-3xl absolute left-2.5 text-zinc-300 pr-1  border-zinc-700 h-7 mx-auto" />

            <input
              ref={inputRef}
              type="number"
              placeholder="  Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VerifyPhoneEmail;
