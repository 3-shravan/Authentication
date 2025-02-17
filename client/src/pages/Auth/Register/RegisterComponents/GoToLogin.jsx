import { Link } from "react-router-dom";
import styles from "../../AuthComponents.module.css";

const GoToLogin = () => {
  return (
    <div className={styles.redirectLine}>
      <span>
        {" "}
        Already have a account ?{" "}
        <Link to="/login" className={styles.redirectLink}>
          Login.
        </Link>{" "}
       
      </span>
    </div>
  );
};

export default GoToLogin;
