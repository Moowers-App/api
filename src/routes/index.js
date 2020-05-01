const express = require('express')
const router = express.Router()

// Import routes
const clients = require('./clients')

router.use('/clients', clients)

module.exports = router