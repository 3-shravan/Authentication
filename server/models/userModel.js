import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { generateFiveDigitRandomNumber } from '../utils/utilities.js';

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   email: {
      type: String,

   },
   phone: {
      type: String
   },
   password: {
      type: String,
      minLength: [5, `Password should be atlest 5 characters long.`],
      maxLength: [32, `Password should be less than 32 characters.`]
   },
   accountVerified: {
      type: Boolean,
      default: false
   },
   verificationCode: {
      type: Number
   },
   verificatonCodeExpire: {
      type: Date
   },
   resetPasswordToken: {
      type: String
   },
   resetPasswordTokenExpire: {
      type: Date
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next()
   }
   this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.comapare(this.password, password)
}

userSchema.methods.generateVerificationCode =async function () {
   const verificationCode =await generateFiveDigitRandomNumber()
   this.verificationCode = verificationCode
   this.verificatonCodeExpire = Date.now() + 5 * 60 * 1000
   return verificationCode
}


export const User = mongoose.model('user', userSchema)