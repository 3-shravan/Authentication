export const generateEmailTemplate = (verificationCode) => {
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
     <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 5 minutes.</p>
     <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
     <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
       <p>Thank you,<br>Shravan</p>
       <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
     </footer>
   </div>
 `
}
export const generateResetEmailTemplate = (resetPasswordUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; border-radius: 8px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
        <h2 style="color: #4285F4; margin-bottom: 10px;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #333;">Click the button below to reset your password:</p>
        <a href="${resetPasswordUrl}" style="display: inline-block; background: #34A853; color: white; text-decoration: none; padding: 12px 18px; border-radius: 5px; font-weight: bold; margin-top: 10px;">Reset Password</a>
        <p style="margin-top: 15px; font-size: 14px; color: #666;">Or copy this link:</p>
        <div style="background: #f4f4f4; padding: 8px; border-radius: 5px; word-break: break-all; font-size: 14px;">${resetPasswordUrl}</div>
        <p style="font-size: 14px; color: #999; margin-top: 15px;">If you didn’t request this, please ignore this email.</p>
        <footer style="margin-top: 15px; font-size: 12px; color: #aaa;">© 2025 . All rights reserved.</footer>
    </div>
    `;
};
