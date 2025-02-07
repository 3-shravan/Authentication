import { User } from "../models/userModel.js"
import crypto from 'crypto'

//function to validate correct format for indian phone number
export const validatePhoneNo = (phoneNumber) => {
   const phoneRegex = /^(\+91|91)?[-\s]?[6-9]\d{9}$/;
   return phoneRegex.test(phoneNumber)
}

//count number of attemps made by an user to register 
export const registrationAttempt = async (phone, email) => {
   const query = { accountVerified: false };
   if (phone && email) {
      query.$or = [
         { phone },
         { email }
      ];
   } else if (phone) {
      query.phone = phone;
   } else if (email) {
      query.email = email;
   }
   const attempts = await User.countDocuments(query)
   return attempts
}

//generate 5 digit OTP
export const generateFiveDigitRandomNumber = () => {
   return Math.floor(10000 + Math.random() * 90000);
}

//function to crypt the password
export const crpytPassword = (token) => {
   const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
   return resetPasswordToken;
}



