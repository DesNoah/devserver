const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

// 解析 Ajax 发送的 POST 请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 设置模板引擎
app.set('views', 'src/template')
app.set('view engine', 'pug')
app.locals.pretty = true

// 设置静态文件路径
app.use('/static', express.static(__dirname + '/static'))

// 各种路由
app.use('/', require('./router/index'))
app.use('/files', require('./router/files'))
app.use('/ajax', require('./router/ajax'))

app.listen(port, () => {
  console.log('server is runing on port %s', port)
})