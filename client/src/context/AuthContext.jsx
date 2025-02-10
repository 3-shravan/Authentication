import React, { useContext } from "react";
import { userData } from "../utils/Constants";

const AuthContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(userData);

  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
