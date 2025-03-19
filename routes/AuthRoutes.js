const express = require('express')
const router = express.Router()
const {signIn} = require('../controller/AuthController')


router.post('/signin', signIn)

module.exports = router