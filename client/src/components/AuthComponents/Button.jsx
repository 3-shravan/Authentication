import React from "react";
import styles from "./AuthComponent.module.css";

const Button = ({ handleNext, text, type }) => {
  return (
    <div className={styles.buttonContainer}>
      <button type={type} className={styles.button} onClick={handleNext}>
        {text}
      </button>
    </div>
  );
};

export default Button;
