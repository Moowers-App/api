const express = require('express')
const router = express.Router()

// Import routes
const account = require('./account')

router.get('/', (req, res) => {
  res.send('You just arrived!')
})

router.use('/accounts', account)

module.exports = router