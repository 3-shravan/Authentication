import express from 'express'
import { register, verifyOTP } from '../controllers/userController.js'
const router = express.Router()

router.post('/register', register)
router.post('/verifyotp', verifyOTP)

export default router