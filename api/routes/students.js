const express = require('express')
const router = express.Router()
const {
    getStudentsbyTeacherId,
    createStudent,
    editStudent,
    removeStudent 
} = require('../utils/studentStorage')

router
    .get('/:teacherId', getStudentsbyTeacherId)
    .post('/:teacherId', createStudent)
    .patch('/:teacherId/:studentId', editStudent)
    .delete('/:teacherId/:studentId', removeStudent)

module.exports = router