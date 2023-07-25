const Record = require('../record')
const User = require('../user')

const db = require('../../config/mongoose')
const Category = require('../category')

const SEED_USER = require('./userTable.json')
const COST_TABLE = require('./costTable.json')

db.once('open', () => {
  const records = SEED_USER.map(userSeed => {
    return User.create({
      name: userSeed.name,
      email: userSeed.email,
      password: userSeed.password
    })
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: COST_TABLE.length },
          (_, i) => Record.create({
            name: COST_TABLE[i].name,
            date: COST_TABLE[i].date,
            amount: COST_TABLE[i].amount,
            userId,
            categoryId: Category.findOne({ name: COST_TABLE[i].category })._id
          })
        ))
      })
      .then(() => {
        console.log(userSeed.name, '...ok')
      })
      .catch(err => console.log(err))
  })

  Promise.all(records)
    .then(() => {
      console.log('...done')
      process.exit()
    })
    .catch(err => console.log(err))
})
