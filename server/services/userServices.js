import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js"

/* Create a actual user in database */

export const createUser = ({ name, phone, email, password }) => {
   try {
      const user = User.create({
         name,
         phone,
         email,
         password

      })
      return user;
   } catch (error) {
      throw new ErrorHandler(`Error creating new User: ${error.message}`);
   }
}