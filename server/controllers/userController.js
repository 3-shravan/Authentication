import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import crypto from 'crypto'
import { User } from "../models/userModel.js";
import { createUser } from "../services/userServices.js";
import { validatePhoneNo, registrationAttempt, crpytPassword } from '../utils/utilities.js'
import { sendVerificationCode } from "../services/sendVerificationCode.js";
import { sendToken } from "../services/sendToken.js";
import { ExpiredToken } from "../models/blackListedTokenModel.js";
import { sendEmail } from "../services/sendEmail.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";
import { generateResetEmailTemplate } from "../utils/emailTemplate.js";
import { makePhoneCall } from "../services/phoneCall.js";

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


         if (phone) {
            const isExistPhone = await User.findOne({ phone, accountVerified: true })
            if (isExistPhone) return next(new ErrorHandler(400, "Phone number is already registered."))
         }
         if (email) {
            const isExistEmail = await User.findOne({ email, accountVerified: true })
            if (isExistEmail) return next(new ErrorHandler(400, "Email Address is already registered."))
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
   user.verificationCode = undefined;
   user.verificationCodeExpire = undefined;

   user.save({ validateModifiedOnly: true })

   sendToken(user, 200, "Account Verified", res)

})

export const login = catchAsyncError(async (req, res, next) => {
   const { email, phone, password } = req.body
   if ((!email && !phone) || !password) {
      return next(new ErrorHandler(400, "Either Phone number or Email is required with password"))
   }
   if (email && phone) {
      return next(new ErrorHandler(400, "Please provide either Email or Phone number, not both."));
   }

   let user;
   if (phone) {
      user = await User.findOne({ phone, accountVerified: true }).select("+password")
      if (!user) return next(new ErrorHandler(400, "Invalid phone number|User Not Found."))
   }
   if (email) {
      user = await User.findOne({ email, accountVerified: true }).select("+password")
      if (!user) return next(new ErrorHandler(400, "Invalid email address|User Not Found"))

   }
   const isMatch = await user.comparePassword(password);
   if (!isMatch) return next(new ErrorHandler(400, "Invalid password"))
   user.password = ""

   sendToken(user, 200, 'Login Successfull', res)

})

export const logout = catchAsyncError(async (req, res, next) => {

   const token = req.headers.authorization?.split(" ")[1] || req.cookies.token

   try {
      await ExpiredToken.create({ token })
   } catch (error) {
      throw new ErrorHandler(`Error black listing token: ${error.message}`);
   }

   res.clearCookie("token", { httpOnly: true });
   res.cookie("token", "", {
      expires: new Date(Date.now()), httpOnly: true
   })
   res.status(200).json({ success: true, message: "Logged out Successfully" })
})

export const getUser = catchAsyncError(async (req, res, next) => {
   res.status(200).json({ success: true, user: req.user })
})

export const forgetPassword = catchAsyncError(async (req, res, next) => {
   const { email, phone } = req.body
   if (!phone && !email) {
      return next(new ErrorHandler(400, "Either provide registered email or phone number"));
   }
   if (phone && !validatePhoneNo(phone)) {
      return next(new ErrorHandler(400, "Please enter a valid phone number."))
   }

   if (email) {
      const user = await User.findOne({ email, accountVerified: true })
      if (!user) return next(new ErrorHandler(404, 'No user is registered with this email address'))

      const resetToken = await user.generateResetPasswordToken()
      await user.save({ validateBeforeSave: false })
      const resetPasswordUrl = `${process.env.CLIENT_URL}/forgetPassword/${resetToken}`
      const message = generateResetEmailTemplate(resetPasswordUrl)
      try {
         sendEmail({ email, subject: 'Your Reset Password Link', message })
         handleSuccessResponse(res, 200, `Reset password link is sent to ${email}`)
      } catch (error) {
         user.resetPasswordToken = undefined
         user.resetPasswordTokenExpire = undefined
         await user.save({ validateBeforeSave: false })
         return next(new ErrorHandler(400, error.message || "Failed to send password reset link"))
      }
   }
   else if (phone) {

      const user = await User.findOne({ phone, accountVerified: true })
      if (!user) return next(new ErrorHandler(404, 'No user is registered with this phone number'))

      const resetPasswordOTP = await user.generateResetPasswordOTP()
      await user.save({ validateBeforeSave: false })

      try {
         await makePhoneCall('', phone, resetPasswordOTP, 'for reseting the password')
         handleSuccessResponse(res, 200, `Verification code to reset your password has been sent`)

      } catch (error) {

         user.resetPasswordOTP = undefined
         user.resetPasswordOTPExpire = undefined
         await user.save({ validateBeforeSave: false })

         return next(new ErrorHandler(400, error.message || 'Failed to make call for verification Code | Phone Nu,ber invalid'))
      }
   }
})
export const verifyResetPasswordOTP = catchAsyncError(async (req, res, next) => {
   const { phone, otp } = req.body
   if (!otp || !phone) return next(new ErrorHandler(400, "phone number and OTP are required for verification"))

   const user = await User.findOne({ phone, resetPasswordOTP: otp, resetPasswordOTPExpire: { $gt: Date.now() } })
   if (!user) return next(new ErrorHandler(400, "Invalid OTP"))

   user.resetPasswordOTP = undefined
   user.resetPasswordOTPExpire = undefined
   await user.save({ validateBeforeSave: false })

   handleSuccessResponse(res, 200, 'OTP Verified.')
})


export const resetPasswordViaEmail = catchAsyncError(async (req, res, next) => {
   const { token } = req.params
   const { phone, newPassword, confirmPassword } = req.body

   if (!newPassword || !confirmPassword) return next(new ErrorHandler(400, "Plaese provide your new password as well as confirm password"))

   if (newPassword !== confirmPassword) return next(new ErrorHandler(400, 'New password and confirm Password do not match'))

   let user;
   if (token) {

      const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await User.findOne({ resetPasswordToken, accountVerified: true, resetPasswordTokenExpire: { $gt: Date.now() } }).select('+password')
      if (!user) return next(new ErrorHandler(400, "Invalid token or Expired"))

      user.resetPasswordToken = undefined
      user.resetPasswordTokenExpire = undefined

   }
   if (phone) {
      user = await User.findOne({ phone, accountVerified: true }).select('+password')
      if (!user) return next(new ErrorHandler(400, 'Invalid phone'))

      user.resetPasswordOTP = undefined
      user.resetPasswordOTPExpire = undefined
   }

   const isMatch = await user.comparePassword(newPassword)
   if (isMatch) return next(new ErrorHandler(400, 'Previouly used password. Please enter new password.'))

   user.password = newPassword
   await user.save()

   handleSuccessResponse(res, 200, "Password Reset Successfully")

})



