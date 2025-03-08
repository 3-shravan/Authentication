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



/* Register Controller */

export const register = catchAsyncError(
   async (req, res, next) => {
      try {
         const { name, email, phone, password, verificationMethod } = req.body;

         if (!name || (!phone && !email) || !password || !verificationMethod) {
            return next(new ErrorHandler(400, 'All fields are required.'))
         }

         //verification method mismatch with rovided field 

         if (!phone && verificationMethod === 'phone') {
            return next(new ErrorHandler(400, "Phone number is required for phone verification."))
         }
         if (!email && verificationMethod === 'email') {
            return next(new ErrorHandler(400, "Email address is required for email verification."))
         }

         //check for valid phone number
         if (phone && !validatePhoneNo(phone)) {
            return next(new ErrorHandler(400, "Please enter a valid phone number."))
         }

         //check if user already exists 
         if (phone) {
            const isExistPhone = await User.findOne({ phone, accountVerified: true })
            if (isExistPhone) return next(new ErrorHandler(409, 'Phone number is already registered.'))
         }
         if (email) {
            const isExistEmail = await User.findOne({ email, accountVerified: true })
            if (isExistEmail) return next(new ErrorHandler(409, 'Email address is already registered.'))
         }

         //limit the user for making repeated request
         if (await registrationAttempt(phone, email) > 3) {
            return next(new ErrorHandler(429, "You have exceeded the maximum number of attempts.Please try again after an hour."))
         }

         const user = await createUser({ name, phone, email, password })

         //create a otp and send to user after storing the same otp in database to veryfy it later 
         const verificationCode = await user.generateVerificationCode()
         await user.save()

         //send code to user email or phone based on user preference
         const message = await sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res)
         handleSuccessResponse(res, 200, message)

      } catch (error) {
         next(error)
      }
   }
)




/* Controller that verifies the user is real by verifying its opt */

export const verifyOTP = catchAsyncError(async (req, res, next) => {
   const { email, phone, otp } = req.body

   //if missing fields
   if (!otp) return next(new ErrorHandler(400, 'OTP is required.'))
   if (!phone && !email) return next(new ErrorHandler(400, 'Either phone number or email is required for verification'))

   //check if phone number is invalid format 
   if (phone && !validatePhoneNo(phone)) {
      return next(new ErrorHandler(400, 'Invalid phone number'))
   }

   //query to find the user
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

   //fetch the latest user entry from database using above query
   const users = await User.find(query).sort({ createdAt: -1 });


   //if no user exists
   if (users.length === 0) {
      return next(new ErrorHandler(404, 'User not found. Please check the provided phone number or email.'))
   }

   //when there are multiple user req ...delete them after fetching the latest
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

   //fetch that stored OTP and compare it with OTP provided by user
   const verificationcode = user.verificationCode;
   if (verificationcode != Number(otp)) {
      return next(new ErrorHandler(400, 'Invalid OTP'))
   }

   //check if the provided OTP is expired one
   const currentTime = Date.now()
   const expireTime = new Date(user.verificationCodeExpire).getTime();
   if (expireTime < currentTime) {
      return next(new ErrorHandler(400, 'OTP Expired. Please request a new one.'))
   }

   //set user as verified  and set undefine for verification fields as they are no longer required
   user.accountVerified = true;
   user.verificationCode = undefined;
   user.verificationCodeExpire = undefined;

   user.save({ validateModifiedOnly: true })

   sendToken(user, 200, "Account Successfully Verified", res)
})




/* Login Controller */

export const login = catchAsyncError(async (req, res, next) => {

   const { email, phone, password } = req.body

   //user can only login with either phone number or email address
   if ((!email && !phone) || !password) {
      return next(new ErrorHandler(400, "Credentials are required"))
   }
   if (email && phone) {
      return next(new ErrorHandler(400, "Please provide either Email or Phone number, not both."));
   }


   let user;

   //find user using phone or email ...as user must exist to login 
   if (phone) {
      user = await User.findOne({ phone, accountVerified: true }).select("+password")
      if (!user) return next(new ErrorHandler(404, "Invalid user or unverified account."))
   }
   if (email) {
      user = await User.findOne({ email, accountVerified: true }).select("+password")
      if (!user) return next(new ErrorHandler(404, "Invalid user or unverified account."))
   }


   //Validate the password 
   const isMatch = await user.comparePassword(password);
   if (!isMatch) return next(new ErrorHandler(400, 'Incorrect password. Please try again.'))


   //send null value as password to client 
   user.password = ""

   sendToken(user, 200, 'Login Successfull🚀.', res)
})




/* Controller to handle logout logiic */

export const logout = catchAsyncError(async (req, res, next) => {

   //fetch the token 
   const token = req.headers.authorization?.split(" ")[1] || req.cookies.token

   // make the token expire so that no user can login after logout using this token 
   try {
      await ExpiredToken.create({ token })
   } catch (error) {
      throw new ErrorHandler(500, `Error black listing token: ${error.message}`);
   }

   //expire and clear the cookies
   res.clearCookie("token", { httpOnly: true });
   res.cookie("token", "", {
      expires: new Date(Date.now()), httpOnly: true
   })

   res.status(200).json({ success: true, message: "Logged out Successfully." })
})



/* This controller sends the User info as response */

export const getUser = catchAsyncError(async (req, res, next) => {
   res.status(200).json({ success: true, user: req.user })
})



/* Cotroller to handle the logic for forget password and send verfication link or OTP to verify the user for resting the password of his account */

export const forgetPassword = catchAsyncError(async (req, res, next) => {

   const { email, phone } = req.body

   //user can req for verification code either via phone number or verification link via Email address
   if (!phone && !email) {
      return next(new ErrorHandler(400, "Credentials are required."));
   }
   //validate the phone number is in correct format
   if (phone && !validatePhoneNo(phone)) {
      return next(new ErrorHandler(400, "Please enter a valid phone number."))
   }


   //when user want to reset the password by verification link via email address
   if (email) {
      const user = await User.findOne({ email, accountVerified: true })
      if (!user) return next(new ErrorHandler(404, 'Invalid email address ❌.'))

      //generate a token (resetToken) store the hashed password in database for later verification and send the unhashed token as params in reset password link
      const resetToken = await user.generateResetPasswordToken()
      await user.save({ validateBeforeSave: false })

      //create a resetpassword URL
      const resetPasswordUrl = `${process.env.CLIENT_URL}/resetPassword/email/${resetToken}`
      const message = generateResetEmailTemplate(resetPasswordUrl)
      try {
         sendEmail({ email, subject: 'Your Reset Password Link', message })
         handleSuccessResponse(res, 200, `Reset password link is sent to ${email}`)

      } catch (error) {
         // if can't send the verification link clear the resetToken fields...as user will get new token 
         user.resetPasswordToken = undefined
         user.resetPasswordTokenExpire = undefined

         await user.save({ validateBeforeSave: false })

         return next(new ErrorHandler(400, error.message || "Failed to send password reset link"))
      }
   }

   //when user want to reset the password using verification code via phone number
   else if (phone) {

      const user = await User.findOne({ phone, accountVerified: true })
      if (!user) return next(new ErrorHandler(404, 'Invalid phone number❌.'))

      //generate verification code
      const resetPasswordOTP = await user.generateResetPasswordOTP()
      await user.save({ validateBeforeSave: false })

      //send verificaton code 
      try {
         await makePhoneCall('', phone, resetPasswordOTP, 'for reseting the password')
         handleSuccessResponse(res, 200, `Verification code to reset your password has been sent`)

      } catch (error) {

         // if can't send the verification code clear the resetOTP fields...as user will get new otp 
         user.resetPasswordOTP = undefined
         user.resetPasswordOTPExpire = undefined
         await user.save({ validateBeforeSave: false })

         return next(new ErrorHandler(400, error.message || 'Failed to make call for verification Code | Invalid phone number'))
      }
   }
})



/* OTP verification for reseting the password via phone number */

export const verifyResetPasswordOTP = catchAsyncError(async (req, res, next) => {
   const { phone, otp } = req.body
   if (!otp || !phone) return next(new ErrorHandler(400, "Credentials are required."))

   const user = await User.findOne({ phone, resetPasswordOTP: otp, resetPasswordOTPExpire: { $gt: Date.now() } })
   if (!user) return next(new ErrorHandler(400, "Invalid OTP"))

   user.resetPassword = true
   user.resetPasswordOTP = undefined
   user.resetPasswordOTPExpire = undefined
   await user.save({ validateBeforeSave: false })

   handleSuccessResponse(res, 200, 'OTP Verified.')
})




/* this controller handles the logic for reseting the password via a email as well as phone number */

export const resetPassword = catchAsyncError(async (req, res, next) => {
   //get the token from params from verification link sent to the uesr's email address
   const { token } = req.params

   const { phone, newPassword, confirmPassword } = req.body

   if (!newPassword || !confirmPassword) return next(new ErrorHandler(400, "Plaese provide your new password and confirm password"))

   if (newPassword !== confirmPassword) return next(new ErrorHandler(400, 'New password and confirm Password do not match'))

   let user;

   // reseting through the email verification link
   if (token) {

      const resetPasswordToken = crpytPassword(token)
      user = await User.findOne({ resetPasswordToken, accountVerified: true, resetPasswordTokenExpire: { $gt: Date.now() } }).select('+password')
      if (!user) return next(new ErrorHandler(400, "Invalid token or Expired"))

      user.resetPasswordToken = undefined
      user.resetPasswordTokenExpire = undefined

   }
   // reseting through the phone verification OTP/code
   if (phone) {
      user = await User.findOne({ phone, accountVerified: true, resetPassword: true }).select('+password')
      if (!user) return next(new ErrorHandler(400, 'Unauthorize to reset password'))

      user.resetPassword = false
      user.resetPasswordOTP = undefined
      user.resetPasswordOTPExpire = undefined
   }

   //if user's new password is previously used one
   const isMatch = await user.comparePassword(newPassword)
   if (isMatch) return next(new ErrorHandler(400, 'Previouly used password. Please enter new password.'))

   //set the new password
   user.password = newPassword
   await user.save()

   handleSuccessResponse(res, 200, "Password Reset Successfully🗽.")

})



