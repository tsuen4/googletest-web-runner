const fs = require('fs')
const { join } = require('path')
const express = require('express')
const app = express()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { execFile } = require('child_process')

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

app.set('port', process.env.PORT || 3002)
app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`)
})

app.get('/', (req, res) => {
  res.send('foo bar')
})

app.get('/upload', (req, res) => res.sendFile(join(__dirname, 'public/upload.html')))

app.post('/upload', upload.array('codes'), (req, res) => {
  const files = req.files.map(value => value.path.replace(/^uploads\//, ''))
  console.log(files)
  // for (file of req.files) {
  //   console.log(file.path)
  // }
  const argFiles = files.join(' ')
  const runCommand = `run -v ./uploads:/gtest --rm googletest_01 ${argFiles}`

  execFile('docker', runCommand.split(' '), (err, stdout, stderr) => {
    if (err) console.error(stderr)
    console.log(stdout)
  })
  res.send('uppi!')
})
// app.post('/upload', upload.array('code'), (req, res) => {
//   res.send('uppi!')
// })