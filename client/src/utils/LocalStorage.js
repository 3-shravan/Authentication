export const setToken = (token) => {
   localStorage.setItem("token", token);
};

export const getToken = () => {
   return localStorage.getItem("token");
};

export const setIsAuthenticated = (isAuthenticated) => {
   localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
};

export const getIsAuthenticated = () => {
   return JSON.parse(localStorage.getItem("isAuthenticated"));
};

export const setTokenAndAuthenticated = (token, isAuthenticated) => {
   localStorage.setItem("token", token)
   localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated))
}




