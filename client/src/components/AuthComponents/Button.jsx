import React from "react";
import styles from "./AuthComponent.module.css";

const Button = ({ handleNext, text }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={handleNext}>
        {text}
      </button>
    </div>
  );
};

export default Button;
