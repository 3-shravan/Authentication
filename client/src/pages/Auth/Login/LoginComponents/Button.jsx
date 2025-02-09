import styles from "./LoginComponents.module.css";

const Button = ({ handleNext, text, type, loading }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        type={type}
        className={styles.button}
        onClick={handleNext}
        disabled={loading}
      >
        {loading ? <span className={styles.loader}></span> : text}
      </button>
    </div>
  );
};

export default Button;
