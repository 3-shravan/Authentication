import React, { useContext } from "react";
import { getIsAuthenticated, getToken } from "../utils/LocalStorage";

const AuthContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = React.useState({
    isAuthenticated: getIsAuthenticated() ||false,
    token: getToken() || null,
    profile: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
