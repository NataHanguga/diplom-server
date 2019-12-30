const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth');

const {
    getStudentsbyTeacherId,
    createStudent,
    editStudent,
    removeStudent 
} = require('../utils/studentStorage')

router
    .get('/:teacherId', checkAuth, getStudentsbyTeacherId)
    .post('/:teacherId', checkAuth, createStudent)
    .patch('/:teacherId/:studentId', checkAuth, editStudent)
    .delete('/:teacherId/:studentId', checkAuth, removeStudent)

module.exports = router