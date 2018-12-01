const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/devserver')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connect error'))
db.once('open', (callback) => {
  console.log('mongodb connect success')
})

const schema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  type: String,
  datetime: Number,
})

const model = mongoose.model('files', schema)

module.exports = model