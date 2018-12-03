const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (request, response) => {
  response.send({
    author: 'suwako',
    description: 'A development server...'
  })
})

router.get('/public/*', (request, response) => {
  const url = request.url.split('?')
  response.sendFile(path.resolve('./') + url[0])
});

router.get('/xmsl', (request, response) => {
  response.render('xmsl', {})
})

router.get('/search', (request, response) => {
  response.render('form', {})
})

module.exports = router