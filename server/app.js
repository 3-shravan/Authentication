import { config } from 'dotenv'
config({path:'./config.env'})
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './database/database.js'
import userRouter from './routes/userRoutes.js'
import { errorMiddleware } from './middlewares/errorHandler.js'

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

app.use(errorMiddleware)







