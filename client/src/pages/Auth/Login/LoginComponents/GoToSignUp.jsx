import React from "react";
import styles from "../../AuthComponents.module.css";
import { Link } from "react-router-dom";

const GoToSignUp = () => {
  return (
    <div className={styles.redirectLine}>
      <span>
        {" "}
        New Here ?{" "}
        <Link to="/signup" className={styles.redirectLink}>
          SignUp.
        </Link>{" "}
      </span>
    </div>
  );
};

export default GoToSignUp;
