import { createTwilioClient } from '../utils/twilioClient.js'
export const makePhoneCall = async (name, phone, verificationCode) => {
   const client = createTwilioClient()
   const verificationCodeWithSpace = verificationCode.toString().split("").join(" ");
   const phoneNumber = `+91${phone.trim().slice(-10)}`;
   
   await client.calls.create({
      twiml:
         `  <Response>
            <Say>
            Hello  ${name} .Your Verification Code is ${verificationCodeWithSpace}.
            </Say>
            </Response>
               `,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
   })
}