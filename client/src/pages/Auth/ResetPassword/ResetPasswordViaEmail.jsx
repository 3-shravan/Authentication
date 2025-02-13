import React from "react";
import styles from "./Reset.module.css";
import { useParams } from "react-router-dom";
import FormContainer from "./FormContainer";
import AuthButton from "../../../components/UI/AuthButton";
import { useApi } from "../../../hooks/useApi";

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
    <div className={styles.container}>
      <form
        action=""
        className={styles.formContainer}
        onSubmit={(e) => submitHandler(e)}
      >
        <FormContainer formData={formData} setFormData={setFormData} />
        <AuthButton text="Reset" type="submit" loading={loading} />
      </form>
    </div>
  );
};

export default ResetPassowrdViaEmail;
