import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./Register.module.css";
import Fullname from "../../../components/AuthComponents/Fullname";
import Password from "../../../components/AuthComponents/Password";
import VerifyPhoneEmail from "../../../components/AuthComponents/VerifyPhoneEmail";
import VerifyOTP from "../../../components/AuthComponents/VerifyOTP";
import Button from "../../../components/AuthComponents/Button";

const Register = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    verificationMethod: "email",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    setStage(stage + 1);
  };

  const handlePrevious = (e) => {
    setStage(stage - 1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData
      );
      if (response.status === 200) {
        navigate("/verifyotp");
      }
    } catch (error) {
      console.log(error.response);
    }
    handleNext();
  };

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
      >
        <form
          action=""
          className={styles.formContainer}
          onSubmit={(e) => submitHandler(e)}
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
              <Button handleNext={submitHandler} text="Send OTP" />
            </>
          )}

          {stage === 4 && (
            <VerifyOTP
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          )}
        </form>
      </motion.div>
    </>
  );
};
export default Register;
