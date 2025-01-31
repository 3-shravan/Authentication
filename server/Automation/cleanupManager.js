import cron from 'node-cron'
import removeUnverifiedAccounts from './removeUnverifiedAccounts.js'
import deleteExpireTokens from './deleteTokens.js'
import removeUnverifiedTokensOTPs from './removeUnverifedTokens.js'


const cleanupAllExpiredData = () => {
   cron.schedule('*/15 * * * * *', async () => {
      try {
         await removeUnverifiedAccounts()
         await deleteExpireTokens()
         await removeUnverifiedTokensOTPs()

      } catch (error) {
         new ErrorHandler(500, `Cron Error : ${error?.message}`)
      }
   })
}

export default cleanupAllExpiredData