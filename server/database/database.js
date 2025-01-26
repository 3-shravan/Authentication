import mongoose from 'mongoose'
export const connectToDatabase = () => {
   mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Authentication'
   }).then(() => {
      console.log(`Connected to databse : Authentication`)
     
   }).catch((err) => {
      console.log(`Error connecting to databse : ${err}`)
   })
}