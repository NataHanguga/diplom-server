const express = require('express')
const router = express.Router()
const {getGrades, createGrade, editGrade, deleteGrade} = require('../utils/gradeStorage')

router
    .get('/', getGrades)
    .post('/', createGrade)
    .patch('/:name', editGrade)
    .delete('/:id', deleteGrade)

module.exports = router