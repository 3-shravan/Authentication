import React from "react";
import ByEmail from "./ForgetPasswordComponents/ByEmail";
import ByPhone from "./ForgetPasswordComponents/ByPhone";
import styles from "./ForgetPassword.module.css";
import authStyles from "../AuthComponents.module.css";
import AuthButton from "../../../components/UI/AuthButton";
import VerifyOtp from "./ForgetPasswordComponents/VerifyOtp";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";
import Header from "../../../components/UI/Header"

import { motion } from "framer-motion";
import { useApi } from "../../../hooks/useApi";
import { errorToast } from "../../../utils/ToastNotifications";
import { validForgetEmail, validForgetPhone } from "../../../utils/Validation";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdMotionPhotosOn } from "react-icons/md";

const initialData = {
  email: "",
  phone: "",
};
const RESEND_TIME = 30
const ForgetPassword = () => {
  const [formData, setFormData] = React.useState(initialData);
  const [byEmail, setByEmail] = React.useState(true);
  const [stage, setStage] = React.useState(0);

  const [isResend, setIsResend] = React.useState(true)
  const [resendTimer, setResendTimer] = React.useState(0)

  const { execute, loading } = useApi("/forgetPassword", "POST");

  React.useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setIsResend(true)
    }
  }, [resendTimer])

  const showError = async () => {
    return errorToast(`Please wait ${resendTimer} seconds before resending OTP.`)
  }

  const handleMethod = () => {
    if (byEmail) {
      formData.email = "";
    } else formData.phone = "";

    setByEmail(!byEmail);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resendHandler = async () => {
    if (!isResend) return errorToast(`Please wait ${resendTimer} seconds before resending OTP.`)

    if (validForgetEmail(formData, byEmail)) {
      return errorToast("Provide a valid Email address");
    }
    if (validForgetPhone(formData, byEmail)) {
      return errorToast("Provide a valid Phone number");
    }
    setIsResend(false)

    const response = await execute(formData);
    if (response.status === 200) {
      setResendTimer(RESEND_TIME)
      !byEmail && setStage(1)
    } else setIsResend(true)
  };

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!isResend) return errorToast(`Please wait ${resendTimer} seconds before resending OTP.`)


    if (validForgetEmail(formData, byEmail)) {
      return errorToast("Provide a valid Email address");
    }

    if (validForgetPhone(formData, byEmail)) {
      return errorToast("Provide a valid Phone number");
    }
    setIsResend(false)

    const response = await execute(formData);
    if (response.status === 200) {
      setResendTimer(RESEND_TIME)
      !byEmail && setStage(1)
    } else setIsResend(true)
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
          onSubmit={(e) => submitHandler(e)}
          className={styles.formContainer}
        >
          <h1 className={authStyles.heading1}>
            <Link to={"/login"}>
              <IoIosArrowBack className={authStyles.backIcon} />
            </Link>
          </h1>
          {stage === 0 && (
            <>
              <motion.h1
                className={authStyles.heading1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, ease: "linear" }}
              >
                Forget Your Password ?{" "}
              </motion.h1>
              <span
                className={authStyles.spanLine}
                onClick={() => handleMethod()}
              >
                Verify via
                <h2>{byEmail ? "Phone Number" : "Email"}</h2>
              </span>

              {byEmail ? (
                <ByEmail handleChange={handleChange} formData={formData} />
              ) : (
                <ByPhone handleChange={handleChange} formData={formData} />
              )}

              <AuthButton
                text={isResend ? "Verify" : `Resend in ${resendTimer}s`}
                type="submit"
                handleNext={submitHandler}
                loading={!isResend && loading}
                icon={
                  <MdMotionPhotosOn className="text-m pl-1 text-black" />
                }
              />
            </>
          )}
        </form>
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 5 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, ease: "linear" }}
            className={styles.formContainer}
          >
            <VerifyOtp
              text={isResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
              resendLoading={loading}
              showError={showError}
              resendHandler={resendHandler}
              isResend={isResend}
              formData={formData}
              setStage={setStage} />
          </motion.div>
        )}
        <PrivacyTermsAndConditions />
      </motion.div>
    </>
  );
};

export default ForgetPassword;
