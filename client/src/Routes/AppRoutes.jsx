import { Routes, Route } from "react-router-dom";
import Register from "../pages/Auth/Register/Register";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login/Login";
import Feed from "../pages/Feeds/Feed";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "../pages/PageNotFound";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import ResetPasswordViaEmail from '../pages/Auth/ResetPassword/ResetPasswordViaEmail'
import ResetPasswordViaPhone from '../pages/Auth/ResetPassword/ResetPasswordViaPhone'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PageNotFound />} />

      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/phone/:phoneNumber" element={<ResetPasswordViaPhone />} />
        <Route path="/resetPassword/email/:token" element={<ResetPasswordViaEmail />} />
        
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/feeds" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
