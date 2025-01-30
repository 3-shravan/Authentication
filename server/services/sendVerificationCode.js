import ErrorHandler from '../middlewares/errorHandler.js';
import { sendEmail } from './sendEmail.js'
import { generateEmailTemplate } from '../utils/emailTemplate.js'
import { handleSuccessResponse } from '../utils/responseHandler.js'
import { makePhoneCall } from './phoneCall.js';


export const sendVerificationCode = async (verificationMethod, verificationCode, name, email, phone, res) => {
   try {
      if (verificationMethod === 'email') {
         const message = generateEmailTemplate(verificationCode);
         try {
            sendEmail({ email, subject: 'Your Verificaton Code', message })
            handleSuccessResponse(res, 200, `Verification code sent to ${name}'s email (${email})`)
         } catch (error) {
            throw new ErrorHandler(500, 'Failed to send verification email')
         }
      }

      if (verificationMethod === 'phone') {
         try {
            makePhoneCall(name, phone, verificationCode ,'')
            handleSuccessResponse(res, 200, `Verification code sent to ${name}'s phone (${phone})`)
         } catch (error) {
            throw new ErrorHandler(400, 'Invalid phone number or service unavailable for non-Indian numbers');
         }
      }

   } catch (error) {
      throw new ErrorHandler(400, 'Invalid Verificaton Method | Failed to send Verification Code ')
   }
}