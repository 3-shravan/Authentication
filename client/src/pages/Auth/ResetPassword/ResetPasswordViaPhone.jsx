import React from "react";
import styles from "./Reset.module.css";
import FormContainer from "./FormContainer";
import AuthButton from "../../../components/UI/AuthButton";
import { useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";

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
    <div className={styles.container}>
      <form
        action=""
        className={styles.formContainer}
        onSubmit={(e) => submitHandler(e)}
      >
        <FormContainer formData={formData} setFormData={setFormData} />
        <AuthButton text="Reset" />
      </form>
    </div>
  );
};

export default ResetPasswordViaPhone;
