import { Link } from "react-router-dom";
import styles from "../../AuthComponents.module.css";

const GoToLogin = () => {
  return (
    <div className={styles.loginLink}>
      <span>
        {" "}
        Already have a account ?{" "}
        <Link to="/login" className={styles.textLinks}>
          Login
        </Link>{" "}
        here.
      </span>
    </div>
  );
};

export default GoToLogin;
