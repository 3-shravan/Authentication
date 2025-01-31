import express from 'express'
import { forgetPassword, getUser, login, logout, register, resetPasswordViaEmail, verifyOTP, verifyResetPasswordOTP } from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'
const router = express.Router()

router.post('/register', register)
router.post('/verifyotp', verifyOTP)
router.post('/login', login)
router.get('/logout', authUser, logout)
router.get('/getUser', authUser, getUser)
router.post('/forgetPassword', forgetPassword)
router.post('/forgetPassword/verifyOTP', verifyResetPasswordOTP)
router.put('/resetPassword/email/:token', resetPasswordViaEmail)
router.put('/resetPassword/email', resetPasswordViaEmail)

export default router