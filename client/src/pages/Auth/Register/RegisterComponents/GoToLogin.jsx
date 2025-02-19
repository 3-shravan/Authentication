import { useNavigate } from "react-router-dom";
import styles from "../../AuthComponents.module.css";

const GoToLogin = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.redirectLine}>
      <span>
        {" "}
        Already have an account?{" "}
        <span
          className={styles.redirectLink}
          onClick={() => navigate("/login", { replace: true })}
        >
          Login.
        </span>{" "}
      </span>
    </div>
  );
};

export default GoToLogin;
