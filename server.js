const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const connectDB = require('./server/database/connection')
const app = express()

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

// Log requests
app.use(morgan('tiny'))

// MongoDB Connection
connectDB()

// Parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

// Set view engine
app.set("view engine", "ejs")
// app.set('views', path.resolve(__dirname, ""))

// load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// Load routes
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})