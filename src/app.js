const express = require('express')

const app = express()

app.set('views', 'src/views')
app.set('view engine', 'pug')
const { setupKakaoLogin } = require('./oauth/kakao')

setupKakaoLogin(app)

app.use('/public', express.static('src/public'))

app.get('/', (req, res) => {
  res.render('signin')
})

module.exports = app
