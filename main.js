const routes = require('./routes/router')

const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.use('/', routes)
app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`)
})
