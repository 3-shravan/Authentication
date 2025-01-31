import nodeMailer from 'nodemailer'

/* Function to send Email */
export const sendEmail = async ({ email, subject, message }) => {
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
}