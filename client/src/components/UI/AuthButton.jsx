import "../../assets/styles/authButton.css";

const AuthButton = ({ handleNext, text, type, loading, register, icon }) => {
  return (
    <div>
      <button
        type={type}
        className={register ? "btn registerAuthButton" : "btn authButton "}
        onClick={handleNext}
        disabled={loading}
      >
        {loading ? (
          <span className={register ? "authLoader" : "loginAuthLoader"}></span>
        ) : (
          <>
            <span className=" flex items-center justify-center text-sm  ">
              {text}
              <span className=" text-zinc-100 flex pt-0.5 font-bold text-2xl">
                {icon}
              </span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default AuthButton;
