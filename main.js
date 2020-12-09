const { join } = require('path')
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`)
})

app.get('/', (req, res) => {
  res.send('foo bar')
})

app.get('/upload', (req, res) => res.sendFile(join(__dirname, 'public/upload.html')))

app.post('/upload', upload.array('codes'), (req, res) => {
  res.send('uppi!')
})
// app.post('/upload', upload.array('code'), (req, res) => {
//   res.send('uppi!')
// })