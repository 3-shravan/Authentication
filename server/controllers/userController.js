import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { createUser } from "../services/userServices.js";
import { validatePhoneNo, registrationAttempt } from '../utils/utilities.js'
import { sendVerificationCode } from "../services/sendVerificationCode.js";

export const register = catchAsyncError(
   async (req, res, next) => {
      try {
         const { name, email, phone, password, verificationMethod } = req.body;
         if (!name || !email || !phone || !password || !verificationMethod) {
            return next(new ErrorHandler(400, 'All fields are required.'))
         }
         if (!validatePhoneNo(phone)) {
            return next(new ErrorHandler(400, " Enter valid PhoneNo."))
         }
         const existingUser = await User.findOne({
            $or: [
               {
                  email,
                  accountVerified: true
               },
               {
                  phone,
                  accountVerified: true
               }
            ]
         })
         if (existingUser) {
            return next(new ErrorHandler(400, "Phone or Email already registered"))
         }
         if (await registrationAttempt(phone, email) > 3) {
            return next(new ErrorHandler(400, "You have exceeded the maximum number of attempts.Please try again after an hour."))
         }

         const user = await createUser({ name, phone, email, password })
         const verificationCode = await user.generateVerificationCode()
         await user.save()
         await sendVerificationCode(verificationMethod,verificationCode, name, email, phone, res)
      } catch (error) { next(error) }
   }
)