const mongoose = require('mongoose')
const Teacher = require('../models/teacher')
const { progressBar, payedMonth } = require('../utils/progressBar')

function getPayed(students) {
    let payed = [0, 0]
    if (students.length) {
        students.forEach((student) => {
            payedMonth(progressBar(student)) ? payed[0]++ : payed[1]++
        });
    }
    console.log(payed);
    return payed;
}
function customTeacherArray(result) {
    let teachers = []
    result.forEach(teacher => {
        let arr = []
        teacher.students.forEach(student => {
            arr.push({
                id: student._id,
                fullName: student.fullName,
                pay: student.pay,
                classNumber: student.classNumber,
                studentType: student.studentType,
                progress: progressBar(student),
                payed: payedMonth(progressBar(student))
            })
        })

        teachers.push({
            name: teacher.name,
            _id: teacher._id,
            students: arr,
            payed: getPayed(teacher.students)
        })
    })
    return teachers
}

module.exports = {
    getTeachers(req, res, next) {
        Teacher
            .find()
            .select('name students')
            .exec()
            .then(result => {
                if (result.length >= 0) {
                    res.status(200).json(customTeacherArray(result))
                } else {
                    res.status(404).json({
                        message: 'No enteries found'
                    })
                }
            })
            .catch(error =>
                res.status(500).json({
                    error: error
                })
            )
    },

    createTeacher(req, res, next) {
        const { name } = req.body
        const teacher = new Teacher({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            students: []
        })
        teacher
            .save((err, data) => {
                if (err) res.status(500).json({
                    error: error
                })
                else res.status(200).json(data)
            })
    },

    editTeacher(req, res, next) {
        const { teacherId } = req.params
        const { newName } = req.body
        Teacher
            .findOneAndUpdate(
                { _id: teacherId },
                { $set: { name: newName } },
                { 'new': true }
            )
            .select('name students _id')
            .exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error =>
                res.status(500).json({
                    error: error
                })
            )
    },

    removeTeacher(req, res, next) {
        const { teacherId } = req.params
        Teacher
            .remove({ _id: teacherId })
            .select('name students _id')
            .exec()
            .then(result =>
                res.status(200).json({
                    teacher: result
                })
            )
            .catch(error =>
                res.status(500).json({
                    error: error
                })
            )
    }

}