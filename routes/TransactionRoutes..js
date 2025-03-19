const express = require('express')
const {createTransaction} = require('../controller/TransactionController')

const router = express.Router()

router.post('/', createTransaction)

module.exports = router