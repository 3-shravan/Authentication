import React from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../../hooks/useApi";
import { LoginInitialFormData } from "../../../utils/Constants";
import { useAuth } from "../../../context/AuthContext";
import { setTokenAndAuthenticated } from "../../../utils/LocalStorage";

import loginstyles from "./Login.module.css";
import styles from "../AuthComponents.module.css";
import AuthButton from "../../../components/UI/AuthButton";
import LoginByEmail from "./LoginComponents/LoginByEmail";
import LoginByPhone from "./LoginComponents/LoginByPhone";

const Login = () => {
  const { setAuth } = useAuth();
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
    <div className={loginstyles.container}>
      <form action="" className={loginstyles.formContainer}>
        {/* <h1 className={styles.heading1}>Welcome Back</h1> */}

        <h1 className={styles.heading2}>Login to your Account.</h1>
        <span className={styles.spanLine} onClick={() => handleMethod()}>
          Login using {loginByEmail ? "Phone Number" : "Email"}
        </span>

        {loginByEmail ? (
          <LoginByEmail handleChange={handleChange} formData={formData} />
        ) : (
          <LoginByPhone handleChange={handleChange} formData={formData} />
        )}

        <AuthButton text="Login" handleNext={submitHandler} loading={loading} />

        <button
          className={loginstyles.forgetPassword}
          onClick={() => navigate("/forgetPassword")}
        >
          Forget Password ?
        </button>
      </form>
    </div>
  );
};

export default Login;
