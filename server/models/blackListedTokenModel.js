import mongoose from 'mongoose'
const blackListTokenSchema = new mongoose.Schema({
   token: {
      type: String,
      require: true
   },
   createdAt: {
      type: Date,
      default: Date.now()
   }
})

export const ExpiredToken = mongoose.model("ExpiredTokens", blackListTokenSchema)
