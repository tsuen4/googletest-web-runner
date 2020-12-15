const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const id = req.body.uuidv4
    const directory = `uploads/${id}`
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
    cb(null, directory)
  },
  filename (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1000 // 10 KB
  },
  fileFilter (req, file, cb) {
    const fileExtention = /(cpp|h|hpp)$/
    // console.log(file)
    if (file.mimetype !== 'text/plain') {
      const message = '不正なファイルです。'
      // console.log(message)
      cb(new Error(message))
    } else if (!fileExtention.test(file.originalname)) {
      const message = '不正なファイルです。'
      // console.log(message)
      cb(new Error(message))
    }
    cb(null, true)
  }
})

module.exports = upload