const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()

//Set initial config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
port = process.env.PORT || 4000

app.listen(port, () => console.log(`APP is ready and listening in port ${port}`))