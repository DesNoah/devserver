const express = require('express')
const model = require('../model/files')
const formidable = require('formidable')
const fs = require('fs')
const utils = require('../utils/utils')

const router = express.Router()

router.get('/', (request, response) => {
  model.find({}, (error, result, res) => {
    response.render('files', {
      files: result,
      fn: {
        moment: (text, options) => utils.moment(text)
      }
    })
  })
})

router.get('/add', (request, response) => {
  response.send({
    state: 'upload success'
  })
})
router.post('/add', (request, response) => {
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = 'public'
  form.keepExtensions = true
  form.maxFieldsSize = 2 * 1024 * 1024

  form.parse(request, (error, fields, files) => {
    if (error) response.send({ state: 'error', error: error })

    let file = files.file
    let datetime = Date.now()
    file['datetime'] = datetime

    model.create(file, (error) => {
      if (error) throw error
      console.log('@insert success')
      response.send({ state: 'success', data: files.file })
    })
  })
})

router.post('/delete', (request, response) => {
  const query = request.body.id ? { _id: request.body.id } : {}

  const promise = new Promise((resolve, reject) => {
    model.find(query, (error, result) => {
      resolve(result)
    })
  })
  .then(result => {
    result.map(file => {
      model.remove(query, () => {
        fs.unlink(file.path, () => {
          console.log('@delete success:', file.path)
        })
      })
    })
    response.send({ method: 'delete', state: 'success', data: request.body })
  })
})

router.get('/search/:id', (request, response) => {
  model.find({ _id: request.params.id }, (error, result, res) => {
    response.send({ file: result })
  })
})

module.exports = router