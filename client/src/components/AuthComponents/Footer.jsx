import styles from "../../pages/Auth/Register/Register.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.footer}>
      <div className={styles.login}>
        <span>
          {" "}
          Already have a account ?{" "}
          <span className={styles.textLinks} onClick={() => navigate("/login")}>
            Login
          </span>{" "}
          here.
        </span>
      </div>
      <div className={styles.policy}>
        <span>
          By continuing to use this website, you acknowledge that you have read,
          understood, and agreed to our{" "}
          <span className={styles.textLinks}>Privacy Policy</span> and{" "}
          <span className={styles.textLinks}>Terms & Conditions.</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
