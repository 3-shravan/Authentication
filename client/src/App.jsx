import Register from "./pages/Auth/Register/Register";
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login/Login";
import Feed from "./pages/Feeds/Feed";
import { Routes, Route } from "react-router-dom";
import ToastConfig from "./config/ToastConfig";
const App = () => {
  return (
    <>
      <ToastConfig />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Register />} />
        <Route path={"/feeds"} element={<Feed />} />
      </Routes>
    </>
  );
};

export default App;
