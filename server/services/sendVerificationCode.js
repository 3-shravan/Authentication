import ErrorHandler from '../middlewares/errorHandler.js';
import { sendEmail } from './sendEmail.js'
import { generateEmailTemplate } from '../utils/emailTemplate.js'
import { handleSuccessResponse } from '../utils/responseHandler.js'
import { makePhoneCall } from './phoneCall.js';


/* Send verification code or link via a email or phone number based on user preference */

export const sendVerificationCode = async (verificationMethod, verificationCode, name, email, phone, res) => {
   try {
      if (verificationMethod === 'email') {
         const message = generateEmailTemplate(verificationCode);
         try {
            sendEmail({ email, subject: 'Your Verificaton Code', message })
            handleSuccessResponse(res, 200, `Verification code sent to ${name}'s email (${email})`)
         } catch (error) {
            throw new ErrorHandler(500, 'Failed to send verification code on email. Please try again later.')
         }
      }

      if (verificationMethod === 'phone') {
         try {
            makePhoneCall(name, phone, verificationCode, '')
            handleSuccessResponse(res, 200,`Verification code successfully sent to ${name}'s phone (${phone}).`)
         } catch (error) {
            throw new ErrorHandler(400,  'Failed to send verification code to phone. Please ensure the phone number is valid or the service is available for your region.');
         }
      }

   } catch (error) {
      throw new ErrorHandler(400, 'Invalid verification method specified. Please use "email" or "phone".')
   }
}