import { useAuth } from "../context/AuthContext";
import { setTokenAndAuthenticated } from "./LocalStorage";

export const SetCredentials = (response) => {
  const { setAuth } = useAuth();

  if (response.status === 200) {
    setAuth({
      token: response.data.token,
      isAuthenticated: true,
      profile: response.data.user,
    });
    setTokenAndAuthenticated(response.data.token, true);
  }
};
