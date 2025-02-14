import React from "react";
import ByEmail from "./ForgetPasswordComponents/ByEmail";
import ByPhone from "./ForgetPasswordComponents/ByPhone";
import styles from "./ForgetPassword.module.css";
import authStyles from "../AuthComponents.module.css";
import AuthButton from "../../../components/UI/AuthButton";
import VerifyOtp from "./ForgetPasswordComponents/VerifyOtp";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";

import { motion } from "framer-motion";
import { useApi } from "../../../hooks/useApi";
import { errorToast } from "../../../utils/ToastNotifications";
import { validForgetEmail, validForgetPhone } from "../../../utils/Validation";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const initialData = {
  email: "",
  phone: "",
};

const ForgetPassword = () => {
  const [formData, setFormData] = React.useState(initialData);
  const [byEmail, setByEmail] = React.useState(true);
  const [stage, setStage] = React.useState(0);

  const { execute, loading } = useApi("/forgetPassword", "POST");

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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validForgetEmail(formData, byEmail)) {
      return errorToast("Provide a valid Email address");
    }

    if (validForgetPhone(formData, byEmail)) {
      return errorToast("Provide a valid Phone number");
    }

    const response = await execute(formData);
    if (response.status === 200) !byEmail && setStage(1);
  };

  return (
    <div className={styles.container}>
      <form
        action=""
        className={styles.formContainer}
        onSubmit={(e) => submitHandler(e)}
      >
        <h1 className={authStyles.heading1}>
          <Link to={"/login"}>
            <IoIosArrowBack className={authStyles.backIcon} />
          </Link>
        </h1>
        {stage === 0 && (
          <>
            <h1 className={authStyles.heading1}>Forget Your Password ? </h1>
            <span
              className={authStyles.spanLine}
              onClick={() => handleMethod()}
            >
              Verify via
              <h2>{byEmail ? "Email" : "Phone Number"}</h2>
            </span>

            {byEmail ? (
              <>
                <ByEmail handleChange={handleChange} formData={formData} />
                <AuthButton
                  text="Verify"
                  type="button"
                  handleNext={submitHandler}
                  loading={loading}
                />
              </>
            ) : (
              <>
                <ByPhone handleChange={handleChange} formData={formData} />
                <AuthButton
                  text="Verify"
                  type="button"
                  handleNext={submitHandler}
                  loading={loading}
                />
              </>
            )}
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
          <VerifyOtp formData={formData} setStage={setStage} />
        </motion.div>
      )}
      <PrivacyTermsAndConditions />
    </div>
  );
};

export default ForgetPassword;
