export const RegisterInitialFormData = {
   name: "",
   email: "",
   phone: "",
   password: "",
   verificationMethod: "email",
}

export const setAllFieldsNull = (formData) => {
   for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
         formData[key] = "";
      }
   }
   return formData;
}

export const LoginInitialFormData = {
   email: "",
   phone: "",
   password: "",
}
