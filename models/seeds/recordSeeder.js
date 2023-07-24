const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = require('./userTable.json')



db.once('open', () => {
  const Record = SEED_USER.map(userSeed => {
    User.create({
      name: userSeed.name,
      email: userSeed.email,
      password: userSeed.password
    })
      .then(user => {
        const userId = user._id
        
       })
  })
})
