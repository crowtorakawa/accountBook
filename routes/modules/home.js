const express = require('express')
const router = express.Router()

const Recode = require('../../models/record')

router.get('/', (req, res) => {
  Recode.find()
    .lean()
    .then(reco => {
      res.render('index', { reco })
    })
    .catch(error => console.error(error))
})

module.exports = router
