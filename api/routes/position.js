const express = require('express')
const router = express.Router()
const {getPositions, createPosition, editPosition, deletePosition} = require('../utils/positionStorage')

router
    .get('/', getPositions)
    .post('/', createPosition)
    .patch('/:id', editPosition)
    .delete('/:id', deletePosition)

module.exports = router