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

         await sendEmail({ email, subject: 'Your Verificaton Code', message })
         return `Verification code successfully sent to ${email}`;
      }

      if (verificationMethod === 'phone') {
         await makePhoneCall(name, phone, verificationCode, '')
         return `Verification code successfully sent to ${phone}.`
      }
      throw new ErrorHandler(400, 'Invalid verification method. Please use "email" or "phone".');
   } catch (error) {
      throw new ErrorHandler(500, 'Failed to send verification code. Please try again later.');
   }
}
