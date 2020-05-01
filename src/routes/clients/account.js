const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Justr arrived to clients account')
})

module.exports = router