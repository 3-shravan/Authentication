import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import {
   forgetPassword,
   getUser,
   login,
   logout,
   register,
   resetPassword,
   verifyOTP,
   verifyResetPasswordOTP
} from '../controllers/userController.js'


const router = express.Router()

router.post('/register', register)
router.post('/verifyotp', verifyOTP)
router.post('/login', login)
router.get('/logout', authUser, logout)
router.get('/profile', authUser, getUser)
router.post('/forgetPassword', forgetPassword)
router.post('/forgetPassword/verifyOTP', verifyResetPasswordOTP)
router.put('/resetPassword/email/:token', resetPassword)
router.put('/resetPassword/phone', resetPassword)

export default router