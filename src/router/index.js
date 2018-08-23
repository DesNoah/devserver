const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.send({
    author: 'suwako',
    greet: 'hello, world!',
    dirname: __dirname
  })
})

module.exports = router