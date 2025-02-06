import { motion } from "framer-motion";
import { TbNumber91Small } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import styles from "./AuthComponent.module.css";

const VerifyPhoneEmail = ({ formData, handleChange, handlePrevious }) => {
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
        Verify yourself.
      </h1>
      <div className={styles.selectionContainer}>
        <span
          className={`${styles.selectionButton} ${
            formData.verificationMethod === "email" ? styles.active : ""
          }`}
          onClick={() =>
            handleChange({
              target: { name: "verificationMethod", value: "email" },
            })
          }
        >
          Email
        </span>
        <span
          type="button"
          className={`${styles.selectionButton} ${
            formData.verificationMethod === "phone" ? styles.active : ""
          }`}
          onClick={() =>
            handleChange({
              target: { name: "verificationMethod", value: "phone" },
            })
          }
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
          <h2 className={styles.inputName}>Enter your Email</h2>
          <div className={styles.inputWrapper}>
            <MdMarkEmailUnread className={styles.emailIcon} />

            <input
              type="email"
              placeholder="Email"
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
          <h2 className={styles.inputName}>Enter your Phone Number</h2>
          <div className={styles.inputWrapper}>
            <FaPlus className={styles.plusIcon} />

            <TbNumber91Small className={styles.phoneIcon} />

            <input
              type="number"
              placeholder="Phone Number"
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
