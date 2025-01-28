import ErrorHandler from '../middlewares/errorHandler.js';
import { sendEmail } from './sendEmail.js'
import { generateEmailTemplate } from '../utils/emailTemplate.js'
import { createTwilioClient } from '../utils/twilioClient.js'
import { handleSuccessResponse, handleErrorResponse } from '../utils/responseHandler.js'


export const sendVerificationCode = async (verificationMethod, verificationCode, name, email, phone, res) => {
   const client = createTwilioClient()

   if (verificationMethod === 'email') {
      const message = generateEmailTemplate(verificationCode);
      try {
         sendEmail({ email, subject: 'Your Verificaton Code', message })
         handleSuccessResponse(res, 200, `Verification code sent to ${name}'s email (${email})`)
      } catch (error) {
         throw new ErrorHandler(500, 'Failed to send verification email')
      }

   } else if (verificationMethod === 'phone') {
      const verificationCodeWithSpace = verificationCode.toString().split("").join(" ");
      const phoneNumber = `+91${phone.slice(-10)}`;

      try {
         await client.calls.create({
            twiml:
               `
                  <Response>
                  <Say>
                  Hello  ${name} .Your Verification Code is ${verificationCodeWithSpace}.
                  </Say>
                  </Response>
                  `,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber

         })
         handleSuccessResponse(res, 200, `Verification code sent to ${phoneNumber}.`)
      } catch (error) {
         throw new ErrorHandler(400, 'Invalid phone number or service unavailable for non-Indian numbers')
      }

   } else throw new ErrorHandler(400, 'Invalid Verificaton Method | Failed to send Verification Code ')
}


