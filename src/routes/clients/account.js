const express = require('express')
const router = express.Router()
const accountService = require('./../../services/clients/accounts')

router.get('/', (req, res) => {
  res.send('Justr arrived to clients account')
})

router.post('/', accountService.create)

module.exports = router