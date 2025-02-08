import nodeMailer from 'nodemailer'

/* Function to send Email */
export const sendEmail = async ({ email, subject, message }) => {
   try {
      const transporter = nodeMailer.createTransport({
         service: process.env.SMTP_SERVICE,
         auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
         }
      })

      const options = {
         from: process.env.SMTP_MAIL,
         to: email,
         subject,
         html: message
      }
      await transporter.sendMail(options)
   } catch (error) {
      throw new ErrorHandler(500, 'Failed to send verification code on email. Please try again later.')
   }
}