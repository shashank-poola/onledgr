import express from 'express'
import dbConnect from './src/config/dbConnect.js';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();

dbConnect();

const app = express()

app.use(express.json())
app.use(cors())

// Routes
import indexRoutes from './src/routes/Index.Routes.js'
app.use('/api',indexRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running.....on port ${PORT}`)
})