const mongoose = require('mongoose')
const { progressBar, payedMonth } = require('../utils/progressBar')
const Teacher = require('../models/teacher')

function customStudentArray(result, month) {
    let arr = [];
    result.students.forEach(student => {
        arr.push({
            id: student._id,
            fullName: student.fullName,
            pay: student.pay,
            classNumber: student.classNumber,
            studentType: student.studentType,
            progress: progressBar(student),
            payed: payedMonth(month, progressBar(student))
        })
    })

    return arr
}

module.exports = {
    getStudentsbyTeacherId(req, res, next) {
        const { teacherId } = req.params;
        const month = req.body.month
        Teacher
            .findById(teacherId)
            .select('students')
            .exec()
            .then(result => {
                if (result)
                    res.status(200).json({
                        studentsArr: customStudentArray(result, month)
                    })
                else
                    res.status(404).json({
                        message: 'No valid entry found for provided ID'
                    })
            })
            .catch(error =>
                res.status(500).json({
                    error: error
                })
            )
    },

    createStudent(req, res, next) {
        const { teacherId } = req.params
        const { fullName, startDate, pay, classNumber, studentType } = req.body
        Teacher
            .findByIdAndUpdate(
                teacherId,
                {
                    $push:
                    {
                        'students': {
                            '_id': new mongoose.Types.ObjectId(),
                            'fullName': fullName,
                            'startDate': startDate,
                            'pay': pay,
                            'classNumber': classNumber,
                            'studentType': studentType
                        }
                    }
                },
                { 'new': true })
            .exec()
            .then(result => {
                if (result)
                    res.status(200).json({
                        studentsArr: customStudentArray(result)
                    })
                else
                    res.status(404).json({
                        message: 'No valid entry found for provided ID'
                    })
            })
            .catch(error =>
                res.status(500).json({
                    error: error
                }))

    },

    editStudent(req, res, next) {
        const { teacherId, studentId } = req.params
        const { fullName, startDate, pay, classNumber, studentType } = req.body
        Teacher
            .findOneAndUpdate(
                { _id: teacherId, students: { $elemMatch: { _id: studentId } } },
                {
                    $set: {
                        'students.$.fullName': fullName,
                        'students.$.startDate': startDate,
                        'students.$.pay': pay,
                        'students.$.classNumber': classNumber,
                        'students.$.studentType': studentType
                    }
                },
                { 'new': true }
            )
            .exec()
            .then(result => {
                if (result)
                    res.status(200).json({
                        studentsArr: customStudentArray(result)
                    })
                else
                    res.status(404).json({
                        message: 'No valid entry found for provided ID'
                    })
            })
            .catch(error =>
                res.status(500).json({
                    error: error
                }))
    },

    removeStudent(req, res, next) {
        const { teacherId, studentId } = req.params
        Teacher
            .findOneAndUpdate(
                { '_id': teacherId },
                {
                    $pull: {
                        'students': {
                            '_id': studentId
                        }
                    }
                },
                { 'new': true }
            )
            .select('name students _id')
            .exec()
            .then(result => {
                if (result)
                    res.status(200).json({
                        studentsArr: customStudentArray(result)
                    })
                else
                    res.status(404).json({
                        message: 'No valid entry found for provided ID'
                    })
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                })
            })
    }
}