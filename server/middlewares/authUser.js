import { ExpiredToken } from "../models/blackListedTokenModel.js";
import { User } from "../models/userModel.js";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";



/* Validation MiiddleWare */

export const authUser = catchAsyncError(async (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1] || req.cookies.token

   if (!token) {
      return next(new ErrorHandler(401, "Authenticaton token is missing "))
   }
   //check whether user trying to acces data with expire or unauthorize token 
   const isBlackListed = await ExpiredToken.findOne({ token })
   if (isBlackListed) return next(new ErrorHandler(401, "Token has been revoked.Please log in again "))

   //decode the token to find the user
   let decoded;
   try {
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
   } catch (error) {
      // Token verification failed (e.g., invalid token)
      return next(new ErrorHandler(401, "Invalid or expired token. Please log in again"));
   }

   const user = await User.findById(decoded.id)
   if (!user) return next(new ErrorHandler(404, "User not found."))

   req.user = user

   next()
})