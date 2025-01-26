import twilio from 'twilio'
import ErrorHandler from '../middlewares/errorHandler.js';
import { sendEmail } from './sendEmail.js'


export const sendVerificationCode = async (verificationMethod, verificationCode, name, email, phone, res) => {
   const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
   try {
      if (verificationMethod === 'email') {
         const message = generateEmailTemplate(verificationCode);
         sendEmail({ email, subject: 'Your Verificaton Code', message })
         return res.status(200).json({
            success: true,
            message: `Verificaton code sent to ${name}'s mail`
         })
      } else if (verificationMethod === 'phone') {
         try {
            const verificationCodeWithSpace = verificationCode.toString().split("").join(" ");
            const phoneNumber = `+91${phone.slice(-10)}`;

            await client.calls.create({
               twiml:
                  `
                  <Response>
                  <Say>
                  Hello Sneha.Your Verification Code is ${verificationCodeWithSpace}.
                  </Say>
                  </Response>
                  `,
               from: process.env.TWILIO_PHONE_NUMBER,
               to: phoneNumber

            })
            return res.status(200).json({
               success: true,
               message: `Verification code sent to ${phoneNumber}.`
            })

         } catch (error) {
            return res.status(400).json({
               success: false,
               message: 'Invalid phone No. | Service current available for Indian phone numbers only. You can cantact admin for any other issue. '
            })

         }

      } else {
         return res.status(400).json({
            success: false,
            message: 'Invalid Verification Method',
         })
      }

   } catch (error) {
      console.log(error)
      return res.status(500).json({
         success: false,
         message: 'Failed to send Verification Code'
      })
   }

}

const generateEmailTemplate = (verificationCode) => {
   return `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
     <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
     <p style="font-size: 16px; color: #333;">Dear User,</p>
     <p style="font-size: 16px; color: #333;">Your verification code is:</p>
     <div style="text-align: center; margin: 20px 0;">
       <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
         ${verificationCode}
       </span>
     </div>
     <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
     <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
     <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
       <p>Thank you,<br>Your Company Team</p>
       <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
     </footer>
   </div>
 `
}