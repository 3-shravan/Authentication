import React from "react";
import styles from "./Reset.module.css";
import authStyles from "../authcomponents.module.css";
import FormContainer from "./FormContainer";
import AuthButton from "../../../components/UI/AuthButton";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { motion } from "framer-motion";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";

const initialFormData = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPassowrdViaEmail = () => {
  const { token } = useParams();
  const [formData, setFormData] = React.useState(initialFormData);

  const { execute, loading } = useApi(
    `/resetPassword/email/${token}`,
    "PUT",
    "/login"
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    await execute(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
      className={styles.container}
    >
      <motion.form
        action=""
        className={styles.formContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
        onSubmit={(e) => submitHandler(e)}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, ease: "linear" }}
          className={authStyles.heading1}
        >
          Create new password.
        </motion.h1>
        <div className={authStyles.space4vh}></div>

        <FormContainer formData={formData} setFormData={setFormData} />
        <div className={authStyles.space1vh}></div>

        <AuthButton text="Reset" type="submit" loading={loading} />

        <Link to="/login" className={authStyles.secondaryButton}>
          Want to login ?
        </Link>
      </motion.form>
      <PrivacyTermsAndConditions />
    </motion.div>
  );
};

export default ResetPassowrdViaEmail;
