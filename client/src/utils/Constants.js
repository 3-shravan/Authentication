import { getIsAuthenticated, getToken } from './LocalStorage'
export const userData = {
   isAuthenticated: getIsAuthenticated(),
   token: getToken(),
   profile: null,
}

export const RegisterInitialFormData = {
   name: "",
   email: "",
   phone: "",
   password: "",
   verificationMethod: "email",
}

export const LoginInitialFormData = {
   email: "",
   phone: "",
   password: "",
}
