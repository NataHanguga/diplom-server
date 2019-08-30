const express = require('express')
const router = express.Router()
const {getPay, editPay} = require('../utils/studentPayStorage')

router
    .get('/', getPay)
    .patch('/', editPay)

module.exports = router