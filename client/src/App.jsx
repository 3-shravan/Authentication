import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
