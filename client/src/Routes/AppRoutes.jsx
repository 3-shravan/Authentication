import { Routes, Route } from "react-router-dom";
import Register from "../pages/Auth/Register/Register";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login/Login";
import Feed from "../pages/Feeds/Feed";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PageNotFound />} />

      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/feeds" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
