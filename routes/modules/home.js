const express = require('express')
const router = express.Router()

// const track = require('../../')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
