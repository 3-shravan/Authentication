import "../../assets/styles/authButton.css";

const AuthButton = ({ handleNext, text, type, loading, register }) => {
  return (
    <div className="authAuthContainer">
      <button
        type={type}
        className={register ? "btn registerAuthButton" : "btn authButton"}
        onClick={handleNext}
        disabled={loading}
      >
        {loading ? <span className="authLoader"></span> : text}
      </button>
    </div>
  );
};

export default AuthButton;
