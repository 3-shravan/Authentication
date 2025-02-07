import Register from "./pages/Auth/Register/Register";
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import ToastConfig from "./components/toastConfig";
const App = () => {
  return (
    <>
      <ToastConfig />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Register />} />
        <Route path={"/verifyotp"} element={<VerifyOtp />} />
      </Routes>
    </>
  );
};

export default App;
