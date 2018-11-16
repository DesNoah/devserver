const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// 解析 Ajax 发送的 POST 请求
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

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
  console.log(request.body)
  // response.send({
  //   state: 'ok',
  //   data: request.body,
  //   msg: '成功!',
  // })
  response.redirect('/files');
})

module.exports = router