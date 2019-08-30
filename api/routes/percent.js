const express = require('express')
const router = express.Router()
const {getPercents, createPercent, editPercent, deletePercent} = require('../utils/percentStorage')

router
    .get('/', getPercents)
    .post('/', createPercent)
    .patch('/:id', editPercent)
    .delete('/:id', deletePercent)

module.exports = router