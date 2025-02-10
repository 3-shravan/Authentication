import React from "react";


import { useApi } from "../../../hooks/useApi";
import { LoginInitialFormData } from "../../../utils/Constants";
import { useAuth } from "../../../context/AuthContext";
import { setTokenAndAuthenticated } from "../../../utils/LocalStorage";


import styles from "./Login.module.css";
import Button from "./LoginComponents/Button";
import LoginByEmail from "./LoginComponents/LoginByEmail";
import LoginByPhone from "./LoginComponents/LoginByPhone";

const Login = () => {
  const { setAuth } = useAuth();

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
    <div className={styles.container}>
      <form action="" className={styles.formContainer}>
        <h1 className={` ${styles.heading2}`}>Login to your Account!</h1>

        {loginByEmail ? (
          <LoginByEmail handleChange={handleChange} formData={formData} />
        ) : (
          <LoginByPhone handleChange={handleChange} formData={formData} />
        )}

        <span className={styles.spanLine}>Forget Password ? </span>
        <Button text="Next" handleNext={submitHandler} />

        <span className={styles.spanLine} onClick={() => handleMethod()}>
          Login by {loginByEmail ? "Phone" : "Email"}
        </span>
      </form>
    </div>
  );
};

export default Login;
