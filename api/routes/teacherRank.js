const express = require('express')
const router = express.Router()
const {getRanks, createRank, editRank, deleteRank} = require('../utils/teacherRankStorage')

router
    .get('/', getRanks)
    .post('/', createRank)
    .patch('/', editRank)
    .delete('/', deleteRank)

module.exports = router