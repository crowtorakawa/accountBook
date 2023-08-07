const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const track = require('./modules/track')
// const users = require('./modules/users')

router.use('/track', track)
// router.use('/users', users)
router.use('/', home)

module.exports = router
