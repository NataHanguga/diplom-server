const express = require('express')
const router = express.Router()
const { 
    getTeachers, 
    createTeacher, 
    editTeacher, 
    removeTeacher 
} = require('../utils/teacherStorage')

router
    .get('/', getTeachers)
    .post('/', createTeacher)
    .patch('/:teacherId', editTeacher)
    .delete('/:teacherId', removeTeacher)

module.exports = router