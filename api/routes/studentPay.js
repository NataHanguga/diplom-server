const express = require('express')
const router = express.Router()
const {getPay, editPay} = require('../utils/studentPayStorage')

router
    .get('/', getPay)
    .patch('/:pay', editPay)

module.exports = router