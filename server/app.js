import { config } from 'dotenv'
config({ path: './config/config.env' })

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectToDatabase from './config/database.js'
import { errorMiddleware } from './middlewares/errorHandler.js'

import userRouter from './routes/userRoutes.js'
import cleanupAllExpiredData from './Automation/cleanupManager.js'


export const app = express()
const allowedOrigins = [process.env.CLIENT_URL, process.env.LOCAL_HOST_URL];
app.use(cors({
   origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ["Authorization", "Content-Type"],
   credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user', userRouter)

connectToDatabase()
cleanupAllExpiredData()

app.use(errorMiddleware)







