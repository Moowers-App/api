const express = require('express')
require('express-async-errors')
require('dotenv').config()
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const routers = require('./src/routes')
const errorHandler = require('./src/middlewares/errorHandler')
const notFound = require('./src/middlewares/notFound')

//Set initial config
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
port = process.env.PORT || 4000

// Routing
app.use('/v1', routers)
app.use(errorHandler)
app.use(notFound)

// Connect to database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@moowersapp-ed4du.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.emit('ready')
    console.log('DB connection is ready!')
}).catch(err => console.error(err))

// Start server
app.on('ready', () => {
  app.listen(port, () => console.log(`API running on PORT ${port}`))
})