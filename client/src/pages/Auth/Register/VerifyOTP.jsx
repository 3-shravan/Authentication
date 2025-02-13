import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

import styles from "../AuthComponents.module.css";
import InputOtp from "../../../components/InputOtp";

import { useApi } from "../../../hooks/useApi";
import { setTokenAndAuthenticated } from "../../../utils/LocalStorage";
import { useAuth } from "../../../context/AuthContext";
import GoToLogin from "./RegisterComponents/GoToLogin";

const VerifyOTP = ({ formData, handlePrevious }) => {
  const phone = formData.phone ? `+91${formData.phone}` : "";
  const { setAuth } = useAuth();

  const { execute, loading } = useApi("/verifyotp", "POST", "/feeds");

  const handleOtpSubmit = async (otp) => {
    const requestData = {
      email: formData.email,
      phone: formData.phone,
      otp,
    };

    const response = await execute(requestData);
    console.log(response);

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
      <form
        action=""
        className={styles.formContainer}
        onSubmit={(e) => {
          handleOtpSubmit(e);
        }}
      >
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
      <GoToLogin />
    </motion.div>
  );
};

export default VerifyOTP;
