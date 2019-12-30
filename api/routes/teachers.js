const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth');

const { 
    getTeachers, 
    createTeacher, 
    editTeacher, 
    removeTeacher 
} = require('../utils/teacherStorage')

router
    .get('/', checkAuth, getTeachers)
    .post('/', checkAuth, createTeacher, getTeachers)
    .patch('/:teacherId', checkAuth, editTeacher, getTeachers)
    .delete('/:teacherId', checkAuth, removeTeacher, getTeachers)

module.exports = router