const express = require('express')
const {createTransaction, getTransaction} = require('../controller/TransactionController')

const router = express.Router()

router.post('/', createTransaction)
router.get('/', getTransaction)

module.exports = router