export const setToken = (token) => {
   localStorage.setItem("token", token || "");
};

export const getToken = () => {
   return localStorage.getItem("token") || "";
};

export const setIsAuthenticated = (isAuthenticated) => {
   localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
};

export const getIsAuthenticated = () => {
   const isAuthenticated = localStorage.getItem("isAuthenticated");
   return isAuthenticated ? JSON.parse(isAuthenticated) : false;
};

export const setTokenAndAuthenticated = (token, isAuthenticated) => {
   localStorage.setItem("token", token || "");
   localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
}




