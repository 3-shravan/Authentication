import React from "react";
import styles from "../AuthComponents.module.css";
import { CgProfile } from "react-icons/cg";

const FormContainer = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className={styles.inputWrapper}>
        <CgProfile className={styles.icon} />
        <input
          type="password"
          placeholder=" New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.inputWrapper}>
        <CgProfile className={styles.icon} />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

export default FormContainer;
