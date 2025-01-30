import { ExpiredToken } from "../models/blackListedTokenModel.js";
import { User } from "../models/userModel.js";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";


export const authUser = catchAsyncError(async (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1] 
   
   if (!token) {
      return next(new ErrorHandler(400, "Authenticaton token is missing "))
   }
   const isBlackListed = await ExpiredToken.findOne({token})
   if (isBlackListed)return next(new ErrorHandler(400, "Token has been revoked.Please log in again "))

   const decoded = await jwt.verify(token, process.env.JWT_SECRET)

   const user = await User.findById(decoded.id)
   if (!user) return next(new ErrorHandler(400, "User not found."))

   req.user = user

   next()
})