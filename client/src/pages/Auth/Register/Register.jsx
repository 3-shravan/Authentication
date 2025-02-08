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
import { errorToast, successToast } from "../../../utils/ToastNotifications";
import Footer from "../../../components/AuthComponents/Footer";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  verificationMethod: "email",
};

const Register = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (stage === 1 && !formData.name.trim())
      return errorToast("Please provide your name.");

    if (stage === 2 && formData.password.length < 6)
      return errorToast("Password must be 6 characters long.");

    setStage((prev) => prev + 1);
  };

  const handlePrevious = () => setStage((prev) => prev - 1);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(String(phone));

  const validateForm = () => {
    if (stage === 3) {
      if (
        formData.verificationMethod === "email" &&
        !isValidEmail(formData.email)
      )
        return "Please provide a valid email address.";
      if (
        formData.verificationMethod === "phone" &&
        !isValidPhone(formData.phone)
      )
        return "Please provide a valid phone number.";

      if (!formData.email.trim() && !formData.phone.trim())
        return "Please provide either phone or email for verification.";

      return null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return errorToast(validationError);
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData
      );
      if (response.status === 200) {
        successToast(response?.data?.message);
        handleNext();
      }
    } catch (error) {
      errorToast(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
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
              <Button
                handleNext={submitHandler}
                text="Send OTP"
                loading={loading}
              />
            </>
          )}
        </form>

        {stage === 4 && (
          <div className={styles.formContainer}>
            <VerifyOTP
              formData={formData}
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          </div>
        )}

        <Footer />
      </motion.div>
    </>
  );
};
export default Register;
