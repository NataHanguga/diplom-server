const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    startDate: { type: String, required: true },
    pay: { type: Number, required: true },
    classNumber: { type: Number, required: true },
    studentType: { type: String, required: true }
})

module.exports = mongoose.model('Student', studentSchema)