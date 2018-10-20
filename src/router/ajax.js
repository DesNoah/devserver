const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.send('ajax');
})

router.get('/success', (request, response) => {
  response.send({
    state: 'ok',
    data: request.query,
    msg: '成功!',
  })
})

router.post('/success', (request, response) => {
  response.send({
    state: 'ok',
    data: request.body,
    msg: '成功!',
  })
})

module.exports = router