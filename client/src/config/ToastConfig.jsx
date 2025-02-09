import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/toastStyles.css";
const ToastConfig = () => {
  return (
    <ToastContainer
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default ToastConfig;
