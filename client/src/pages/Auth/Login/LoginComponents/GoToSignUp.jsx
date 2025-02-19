import React from "react";
import styles from "../../AuthComponents.module.css";
import { useNavigate } from "react-router-dom";

const GoToSignUp = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup", { replace: true });
  };

  return (
    <div className={styles.redirectLine}>
      <span>
        {" "}
        New Here ?{" "}
        <span onClick={handleSignUpClick} className={styles.redirectLink} style={{ cursor: 'pointer' }}>
          SignUp.
        </span>{" "}
      </span>
    </div>
  );
};

export default GoToSignUp;
