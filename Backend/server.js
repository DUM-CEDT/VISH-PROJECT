const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'})

connectDB()

const app = express()

const yanTemplateImage = require('./routes/YanTemplateImage')

app.use(express.json())
app.use('/api/yan/image', yanTemplateImage)

app.get('/', (req , res) => {
    res.status(200).json({success : true, msg : 'Hello World'})
})

const PORT = process.env.PORT || 1234

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, 'mode on port', PORT))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`)
    server.close(() => process.exit(1))
})