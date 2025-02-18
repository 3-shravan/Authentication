import React from "react";

import { motion } from "framer-motion";
import { errorToast, successToast } from "../../../utils/ToastNotifications";
import { useApi } from "../../../hooks/useApi";
import { RegisterInitialFormData } from "../../../utils/Constants";
import { validateForm } from "../../../utils/Validation";

import styles from "./Register.module.css";
import Fullname from "./RegisterComponents/Fullname";
import Password from "./RegisterComponents/Password";
import VerifyPhoneEmail from "./RegisterComponents/VerifyPhoneEmail";
import VerifyOTP from "./VerifyOTP";
import AuthButton from "../../../components/UI/AuthButton";
import GoToLogin from "./RegisterComponents/GoToLogin";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";
import { PiArrowSquareInDuotone } from "react-icons/pi";
import Header from "../../../components/UI/Header";

const RESEND_TIME = 30

const Register = () => {
  const [stage, setStage] = React.useState(1);
  const [formData, setFormData] = React.useState(RegisterInitialFormData);
  const [isResend, setIsResend] = React.useState(true)
  const [resendTimer, setResendTimer] = React.useState(0);



  React.useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResend(true);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (stage === 1 && !formData.name.trim())
      return errorToast("Please provide your name.");

    if (stage === 2 && formData.password.length < 6)
      return errorToast("Password must be 6 characters long.");

    if (stage < 4) {
      setStage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStage((prev) => prev - 1);
  };

  const { execute, loading } = useApi("/register", "POST");


  const showError = async () => {
    return errorToast(`Please wait ${resendTimer} seconds before resending OTP.`)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!isResend) {
      return errorToast(`Please wait ${resendTimer} seconds before resending OTP.`)
    }

    const validationError = validateForm(formData, stage);
    if (validationError) {
      return errorToast(validationError);
    }

    setIsResend(false)

    const response = await execute(formData);
    if (response.status === 200) {
      handleNext();
      setIsResend(false);
      setResendTimer(RESEND_TIME);
    } else {
      setIsResend(true)
    }

  };

  return (
    <>
      <Header />
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
      >
        <form
          action=""
          onScroll={(e) => submitHandler(e)}
          className={styles.formContainer}
        >
          {stage === 1 && (
            <Fullname
              handleNext={handleNext}
              formData={formData}
              handleChange={handleChange}
            />
          )}

          {stage === 2 && (
            <Password
              handleNext={handleNext}
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          )}

          {stage === 3 && (
            <>
              <VerifyPhoneEmail
                handleNext={handleNext}
                formData={formData}
                handleChange={handleChange}
                handlePrevious={handlePrevious}
                submitHandler={submitHandler}
              />
              <AuthButton

                handleNext={isResend && submitHandler}
                type="submit"
                text={isResend ? "Send OTP" : `Resend in ${resendTimer}s`}
                loading={!isResend && loading}
                register={true}
                icon={<PiArrowSquareInDuotone className="text-2xl pl-1" />}
              />
              <GoToLogin />
            </>
          )}
        </form>

        {stage === 4 && (
          <div className={styles.formContainer}>
            <VerifyOTP
              // text={isResend ? "Send OTP" : `Resend in ${resendTimer}s`}
              // resendLoading={loading}
              // showError={showError}
              // submitHandler={submitHandler}
              // isResend={isResend}
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          </div>
        )}

        <PrivacyTermsAndConditions />
      </motion.div>
    </>
  );
};
export default Register;




/*


import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

import styles from "../AuthComponents.module.css";
import InputOtp from "../../../components/InputOtp";

import { useApi } from "../../../hooks/useApi";
import { setTokenAndAuthenticated } from "../../../utils/LocalStorage";
import { useAuth } from "../../../context/AuthContext";
import GoToLogin from "./RegisterComponents/GoToLogin";

const VerifyOTP = ({
  formData,
  handlePrevious,
  isResend,
  submitHandler,
  showError,
  resendLoading,
  text,
}) => {
  const phone = formData.phone ? `+91${formData.phone}` : "";
  const { setAuth } = useAuth();

  const { execute, loading } = useApi("/verifyotp", "POST", "/feeds");

  const handleResendOtp = () => {
    isResend ? submitHandler() : showError();
  };

  const handleOtpSubmit = async (otp) => {
    const requestData = {
      email: formData.email,
      phone: formData.phone,
      otp,
    };

    const response = await execute(requestData);

    if (response.status === 200) {
      setAuth({
        token: response.data.token,
        isAuthenticated: true,
        profile: response.data.user,
      });
      setTokenAndAuthenticated(response.data.token, true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      <form action="" className={styles.formContainer}>
        <h1 className={styles.heading1}>
          <IoIosArrowBack
            onClick={handlePrevious}
            className={styles.backIcon}
          />
        </h1>
        <h2 className={styles.inputName}>
          We sent you a Verification Code on{" "}
          <span className={styles.email}>
            {phone} {formData.email}
          </span>
        </h2>

        <InputOtp handleOtpSubmit={handleOtpSubmit} loading={loading} />
      </form>

      <button
        type="button"
        onClick={() => handleResendOtp()}
        className="resendOtp"
        disabled={resendLoading}
      >
        {resendLoading ? "..." : text}
      </button>

      <GoToLogin />
    </motion.div>
  );
};

export default VerifyOTP;


*/