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
app.use(cors({
   origin: process.env.CLIENT_URL,
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







