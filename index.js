require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const PORT = 8012


const app = express()
app.use(
    cors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server running on ${Date(Date.now)}`)
    console.log(`Server listening on port : http://localhost:${PORT}`)
})