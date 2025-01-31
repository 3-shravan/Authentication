import cron from 'node-cron'
import { ExpiredToken } from '../models/blackListedTokenModel.js'
import ErrorHandler from '../middlewares/errorHandler.js'

const deleteExpireTokens = () => {
   //this function runs daily at midnight
   cron.schedule('0 0 * * *', async () => {
      try {
         const thirtyDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
         await ExpiredToken.deleteMany({ createdAt: { $lt: thirtyDaysAgo } })

      } catch (error) {
         new ErrorHandler(500, `Cron Error : ${error?.message}`)
      }
   })
}

export default deleteExpireTokens