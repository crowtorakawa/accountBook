const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:track_id/edit', (req, res) => {
  const id = req.params.track_id
  // res.render('edit', { id })
  return Record.findOne({ _id: id })
    .lean()
    .then((recodes) => res.render('edit', { recodes }))
    .catch(error => console.log(error))
})

module.exports = router
