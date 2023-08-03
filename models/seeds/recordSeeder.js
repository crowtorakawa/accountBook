const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const db = require('../../config/mongoose')

const SEED_USER = require('./userTable.json')
const COST_TABLE = require('./costTable.json')

db.once('open', () => {
  const returnindex = []

  for (let j = 0; j < COST_TABLE.length; j++) {
    for (let i = 0; i < SEED_USER.length; i++) {
      for (let z = 0; z < SEED_USER[i].costNum.length; z++) {
        // console.log(`${j}${i}${z}`)
        // console.log(`${j}${SEED_USER[i].costNum[z]}`)
        if (j === SEED_USER[i].costNum[z] - 1) {
          console.log('get!!!!!!!!!!!!!!!!!!!!!!!')
          returnindex[j] = {
            name: COST_TABLE[SEED_USER[i].costNum[z] - 1].name,
            date: COST_TABLE[SEED_USER[i].costNum[z] - 1].date,
            amount: COST_TABLE[SEED_USER[i].costNum[z] - 1].amount,
            userId: i,
            categoryId: COST_TABLE[SEED_USER[i].costNum[z] - 1].category
          }
        }
      }
    }
  }
  const records = SEED_USER.map(userSeed => {
    return User.create({
      name: userSeed.name,
      email: userSeed.email,
      password: userSeed.password
    })
      .then(user => {
        const userId = user._id

        return Promise.all(Array.from(
          { length: returnindex.length },
          (_, i) => {
            return Category.findOne({ name: returnindex[i].categoryId })
              .then(ID => {
                if (returnindex[i].userId === 0) {
                  returnindex[i].userId = 1
                  return Record.create({
                    name: returnindex[i].name,
                    date: returnindex[i].date,
                    amount: returnindex[i].amount,
                    categoryId: ID._id,
                    userId
                  })
                } else {
                  returnindex[i].userId = 0
                  return 0
                }
              })
          }
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
