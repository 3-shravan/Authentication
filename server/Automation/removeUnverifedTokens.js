import cron from 'node-cron'
import { User } from '../models/userModel.js'
export const removeUnverifiedTokensOTPs = () => {
   cron.schedule('*/30 * * * *', async () => {
      try {

         //Remove expired phone verification fields
         await User.updateMany({
            resetPasswordOTPExpire: { $lt: Date.now() }
         }, {
            $unset: {
               resetPasswordOTPExpire: null,
               resetPasswordOTP: null,
               resetPassword: false
            }
         })

         //Remove expired email verification fields
         await User.updateMany({
            resetPasswordTokenExpire: { $lt: Date.now() }
         },
            {
               $unset: {
                  resetPasswordToken: null,
                  resetPasswordTokenExpire: null,
               }
            })

      } catch (error) {
         new ErrorHandler(500, `Cron Error : ${error?.message}`)
      }

   })
}

export default removeUnverifiedTokensOTPs