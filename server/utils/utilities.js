import { User } from "../models/userModel.js"

export const validatePhoneNo = (phoneNumber) => {
   const phoneRegex = /^(\+91|91)?[-\s]?[6-9]\d{9}$/;
   return phoneRegex.test(phoneNumber)
}

export const registrationAttempt = async (phone, email) => {
   const attempts = await User.countDocuments({
      $or: [
         { phone, accountVerified: false },
         { email, accountVerified: false },
      ]
   })
   return attempts
}

export const generateFiveDigitRandomNumber = () => {
   return Math.floor(10000 + Math.random() * 90000);
}

