const mongoose = require('mongoose')
const Student  =require('./student')
const StudentSchema = mongoose.model('Student').schema

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    students: [StudentSchema]
})

module.exports = mongoose.model('Teacher', teacherSchema)