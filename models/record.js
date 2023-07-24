const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    require: true // 這是個必填欄位
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    require: true
  },
  userId: { // 加入關聯帳號id
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  },
  categoryId: { // 加入關聯帳號id
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    require: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
