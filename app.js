const express = require('express')
require('dotenv').config()
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const routers = require('./src/routes')

//Set initial config
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
port = process.env.PORT || 4000

app.use('/v1', routers)

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