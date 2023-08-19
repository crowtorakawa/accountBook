const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:track_id/edit', (req, res) => {
  const id = req.params.track_id
  // res.render('edit', { id })
  return Record.findOne({ _id: id })
    .lean()
    .then((recodes) => {
      Category.findOne({ _id: recodes.categoryId })
        .lean()
        .then((categorys) => {
          res.render('edit', { recodes, date: recodes.date.toISOString().substring(0, 10), categorys })
        })
    }
    )
    .catch(error => console.log(error))
})

module.exports = router
