import express from 'express'
import { getUser, login, logout, register, verifyOTP } from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'
const router = express.Router()

router.post('/register', register)
router.post('/verifyotp', verifyOTP)
router.post('/login', login)
router.get('/logout', authUser, logout)
router.get('/getUser', authUser, getUser)

export default router