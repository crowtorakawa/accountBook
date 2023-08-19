const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/logout', (req, res) =>{
  
})

module.exports = router
