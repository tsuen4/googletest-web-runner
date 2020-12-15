const { join } = require('path')

const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const { exec } = require('../exec')

router.get('/uuid', (req, res) => res.send(uuidv4()))
router.get('/', (req, res) => res.sendFile(join(__dirname, '../public/upload.html')))
router.get('/googletest-license', (req, res) => res.sendFile(join(__dirname, '../public/license.html')))
router.post('/exec', exec)

module.exports = router