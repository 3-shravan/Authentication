export const isValidEmail = (email) => {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
}

export const isValidPhone = (phone) => {
   return /^[6-9]\d{9}$/.test(String(phone));
}

export const validateForm = (formData, stage) => {
   if (stage === 3) {
      if (
         formData.verificationMethod === "email" &&
         !isValidEmail(formData.email)
      )
         return "Please provide a valid email address.";
      if (
         formData.verificationMethod === "phone" &&
         !isValidPhone(formData.phone)
      )
         return "Please provide a valid phone number.";

      if (!formData.email.trim() && !formData.phone.trim())
         return "Please provide either phone or email for verification.";

      return null;
   }
};