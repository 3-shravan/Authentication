import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { createUser } from "../services/userServices.js";
import { validatePhoneNo, registrationAttempt } from '../utils/utilities.js'
import { sendVerificationCode } from "../services/sendVerificationCode.js";
import { sendToken } from "../services/sendToken.js";

export const register = catchAsyncError(
   async (req, res, next) => {
      try {
         const { name, email, phone, password, verificationMethod } = req.body;
         if (!name || (!phone && !email) || !password || !verificationMethod) {
            return next(new ErrorHandler(400, 'All fields are required.'))
         }
         if (!phone && verificationMethod === 'phone') {
            return next(new ErrorHandler(400, "Phone number is required for phone verification."))
         }
         if (!email && verificationMethod === 'email') {
            return next(new ErrorHandler(400, "Email address is required for email verification."))
         }
         if (phone && !validatePhoneNo(phone)) {
            return next(new ErrorHandler(400, "Please enter a valid phone number."))
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
            return next(new ErrorHandler(400, "You are already registered"))
         }
         if (await registrationAttempt(phone, email) > 3) {
            return next(new ErrorHandler(400, "You have exceeded the maximum number of attempts.Please try again after an hour."))
         }

         const user = await createUser({ name, phone, email, password })
         const verificationCode = await user.generateVerificationCode()
         await user.save()
         await sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res)
      } catch (error) { next(error) }
   }
)

export const verifyOTP = catchAsyncError(async (req, res, next) => {
   const { email, phone, otp } = req.body

   if (!otp) return next(new ErrorHandler(400, 'OTP is required.'))

   if (!phone && !email) return next(new ErrorHandler(400, 'Either phone number or email is required.'))

   if (phone && !validatePhoneNo(phone)) {
      return next(new ErrorHandler(400, 'Invalid Phone no.'))
   }

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

   const users = await User.find(query).sort({ createdAt: -1 });

   if (users.length === 0) {
      return next(new ErrorHandler(400, 'User not found'))
   }
   if (users.length > 1) {
      await User.deleteMany({
         _id: { $ne: users[0]._id },
         $or: [
            { phone, accountVerified: false },
            { email, accountVerified: false }
         ]
      });
   }
   let user = users[0];
   const verificationcode = user.verificationCode;
   if (verificationcode != Number(otp)) {
      return next(new ErrorHandler(400, 'Invalid OTP'))
   }
   const currentTime = Date.now()
   const expireTime = new Date(user.verificationCodeExpire).getTime();
   if (expireTime < currentTime) {
      return next(new ErrorHandler(400, 'OTP Expired !'))
   }
   user.accountVerified = true;
   user.verificationCode = null;
   user.verificationCodeExpire = null;

   user.save({ validateModifiedOnly: true })

   sendToken(user, 200, "Account Verified", res)

})
