import styles from "../Register.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.policy}>
        <span>
          By continuing to use this website, you acknowledge that you have read,
          understood, and agreed to our{" "}
          <Link to="/privacy-policy" className={styles.textLinks}>
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/terms-conditions" className={styles.textLinks}>
            Terms & Conditions
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default Footer;
