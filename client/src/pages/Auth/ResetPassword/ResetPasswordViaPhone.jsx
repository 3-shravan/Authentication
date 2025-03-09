import React from "react";
import authStyles from "../AuthComponents.module.css";
import styles from "./Reset.module.css";
import FormContainer from "./FormContainer";
import AuthButton from "../../../components/UI/AuthButton";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";
import Header from "../../../components/UI/Header";

import { Link, useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { motion } from "framer-motion";
import { RiRestartFill } from "react-icons/ri";

const initialFormData = {
  newPassword: "",
  confirmPassword: "",
  phone: "",
};

const ResetPasswordViaPhone = () => {
  const [formData, setFormData] = React.useState(initialFormData);
  const params = useParams();
  const { execute, loading } = useApi("/resetPassword/phone", "PUT", "/login");

  const submitHandler = async (e) => {
    e.preventDefault();
    let reqData = { ...formData, phone: params.phoneNumber };

    await execute(reqData);
  };
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
        className={styles.container}
      >
        <form
          action=""
          className={styles.formContainer}
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

          <AuthButton
            text="Reset"
            type="submit"
            loading={loading}
            icon={<RiRestartFill className="text-md pl-1 text-black" />}
          />
          <Link to="/login" className={authStyles.secondaryButton}>
            Want to login ?
          </Link>
        </form>
        <PrivacyTermsAndConditions />
      </motion.div>
    </>
  );
};

export default ResetPasswordViaPhone;
