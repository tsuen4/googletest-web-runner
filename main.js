const fs = require('fs')
const { join } = require('path')
const express = require('express')
const app = express()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const mkdir_uuidv4 = (baseDirectory) => {
  // 名前が衝突せずにディレクトリの作成ができたらディレクトリ名を返す
  while (true) {
    const directory = `${baseDirectory}/${uuidv4()}`
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
      return directory
    }
    // console.log(`ディレクトリ ${directory} を作成できません`)
  }
}

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const directory = mkdir_uuidv4('uploads')
    cb(null, directory)
  },
  filename (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

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