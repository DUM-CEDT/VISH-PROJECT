const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'})

connectDB()

const vish = require('./routes/vish')

const app = express()

app.get('/', (req , res) => {
    res.status(200).json({success : true, msg : 'Hello World'})
})

app.use('/api/vish', vish)

const PORT = process.env.PORT || 1234

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, 'mode on port', PORT))
