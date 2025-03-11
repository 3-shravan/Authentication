import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useApi } from "../../../hooks/useApi";
import { LoginInitialFormData } from "../../../utils/Constants";
import { useAuth } from "../../../context/AuthContext";
import { setTokenAndAuthenticated } from "../../../utils/LocalStorage";
import { IoLogIn } from "react-icons/io5";

import loginstyles from "./Login.module.css";
import styles from "../AuthComponents.module.css";
import AuthButton from "../../../components/UI/AuthButton";
import LoginByEmail from "./LoginComponents/LoginByEmail";
import LoginByPhone from "./LoginComponents/LoginByPhone";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";
import GoToSignUp from "./LoginComponents/GoToSignUp";
import Header from "../../../components/UI/Header";
import { useMenu } from "../../../context/MenuContext";
import Menu from "../../../components/UI/Menu";

const Login = () => {
  const { setAuth } = useAuth();
  const { menu } = useMenu()

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState(LoginInitialFormData);
  const [loginByEmail, setLoginByEmail] = React.useState(true);
  const { execute, loading } = useApi("/login", "POST", "/feeds");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMethod = () => {
    setFormData(LoginInitialFormData);
    setLoginByEmail(!loginByEmail);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await execute(formData);
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
    <>
      <Header />

      <AnimatePresence>
        {menu && <Menu />}
      </AnimatePresence>


      {
        !menu && <motion.div
          className={loginstyles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ease: "linear" }}
        >
          <form action="" className={loginstyles.formContainer}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, ease: "linear" }}
              className={styles.heading1}
            >
              Good To See You Back !{" "}
            </motion.h1>

            <span className={styles.spanLine} onClick={() => handleMethod()}>
              Login via
              <h2>{loginByEmail ? "Phone Number" : "Email"}</h2>
            </span>

            {loginByEmail ? (
              <LoginByEmail handleChange={handleChange} formData={formData} />
            ) : (
              <LoginByPhone handleChange={handleChange} formData={formData} />
            )}

            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, ease: "linear" }}
            >
              <AuthButton
                handleNext={submitHandler}
                text="Login"
                type="submit"
                loading={loading}
                icon={<IoLogIn className="text-black/90" />}
              />
              <button
                className={styles.secondaryButton}
                onClick={() => navigate("/forgetPassword", { replace: true })}
                type="button"
              >
                Forget Password ?
              </button>
              <GoToSignUp />
            </motion.div>
          </form>
          <PrivacyTermsAndConditions />
        </motion.div>
      }
    </>
  );
};

export default Login;
