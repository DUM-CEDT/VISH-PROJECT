const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path:'./config/config.env'})

const app = express()

app.get('/', (req , res) => {
    res.status(200).json({success : true, msg : 'Hello World'})
})

const PORT = process.env.PORT || 1234

app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, 'mode on port', PORT))