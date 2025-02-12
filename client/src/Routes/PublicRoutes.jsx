import React from "react";
import { Outlet, replace, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  React.useEffect(() => {
    if (!auth.token === "undefined" && auth.isAuthenticated) {
      navigate("/feeds", { replace: true });
      return;
    }
  }, [auth.isauthenticated, navigate]);

  return <Outlet />;
};

export default PublicRoutes;
