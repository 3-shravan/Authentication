import twilio from 'twilio'
import ErrorHandler from '../middlewares/errorHandler.js';
export const makePhoneCall = async (name, phone, verificationCode, specialMessage) => {
   const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

   // add space to verification code
   const verificationCodeWithSpace = verificationCode.toString().split("").join(" ");
   //format the phone number
   const phoneNumber = `+91${phone.trim().slice(-10)}`;

   try {
      await client.calls.create({
         twiml:
            `  <Response>
               <Say>
               Hello  ${name} .Your Verification Code ${specialMessage} is ${verificationCodeWithSpace}.
               </Say>
               </Response>
                  `,
         from: process.env.TWILIO_PHONE_NUMBER,
         to: phoneNumber
      });
   } catch (error) {
      if (error.code === 21219) {
         throw new ErrorHandler(400, 'Phone verification unavailable. Please use email verification or contact support.');
      }

      throw new ErrorHandler(400, 'Unable to send verification code via phone call. Please try email verification.');

   }
}