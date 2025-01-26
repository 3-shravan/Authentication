import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './database/database.js'
import userRouter from './routes/userRoutes.js'
import  { errorMiddleware } from './middlewares/errorHandler.js'

config({ path: './config.env' })
export const app = express()
app.use(cors({
   origin: process.env.CLIENT_URL,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user',userRouter)

connectToDatabase()

app.use(errorMiddleware)







