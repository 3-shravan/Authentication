import cron from 'node-cron'
import { User } from '../models/userModel.js'

const removeUnverifiedAccounts = () => {    
   cron.schedule('*/30 * * * *', async () => {
      try {
         const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
         await User.deleteMany({ accountVerified: false, createdAt: { $lt: thirtyMinutesAgo } })

      } catch (error) {
         new ErrorHandler(500, `Cron Error: ${error?.message}`);
      }
   })
}

export default removeUnverifiedAccounts