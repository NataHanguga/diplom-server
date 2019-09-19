const express = require('express')
const router = express.Router()
const {getRanks, createRank, editRank, deleteRank} = require('../utils/teacherRankStorage')

router
    .get('/', getRanks)
    .post('/', createRank)
    .patch('/:id', editRank)
    .delete('/:id', deleteRank)

module.exports = router