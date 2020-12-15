const { execFile } = require('child_process')
const fs = require('fs')
const { join } = require('path')
const multer = require('multer')
const upload = require('./multer-settings')

const rmdir = (directoryName) => {
  fs.rmdir(directoryName, { recursive: true }, err => {
    if (err) console.error(err)
  })
}

exports.exec = (req, res) => {
  upload.array('codes')(req, res, (err) => {
    // multer.diskStorage にも req に対しての処理がある
    const id = req.body.uuidv4
    const runDirectory = join(__dirname, 'uploads', id)

    if (err instanceof multer.MulterError) {
      console.dir(err)
      res.status(500)

      if (err.code === 'LIMIT_FILE_SIZE') {
        err.message = 'ファイルサイズが大きいです！' // 'File too large'
        res.send(err.message)
      } else {
        res.send(err.message)
      }

      rmdir(runDirectory)

      return
    } else if (err) {
      console.error(err)

      res.status(500)
      res.send(err.message)
      rmdir(runDirectory)

      return
    }

    // ファイル名のみを docker の引数に渡すように
    const regId = new RegExp('uploads/' + id + '/')
    const files = req.files.map(value => value.path.replace(regId, ''))
    // console.log(files)

    const argFiles = files.join(' ')
    const runCommand = `run -v ${runDirectory}:/gtest --rm gtest_runner ${argFiles}`
    // console.log(runCommand)

    execFile('docker', runCommand.split(' '), { timeout: 20 * 1000 }, (err, stdout, stderr) => {
      const response = stdout + stderr
      console.log(response)
      res.send(response)
      rmdir(runDirectory)
    })
  })
}