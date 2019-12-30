const mongoose = require('mongoose')
const Teacher = require('../models/teacher')
const { progressBar, payedMonth } = require('../utils/progressBar')

function getPayed(students) {
  let payed = [0, 0, 0]
  if (students.length) {
    students.forEach((student) => {
      let pay = payedMonth(progressBar(student), student.studentType);
      pay !== null
        ? (pay ? payed[0]++ : payed[1]++)
        : payed[2]++
    });
  }
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
        startDate: student.startDate,
        progress: student.progress,
        payed: payedMonth(progressBar(student))
      })
    })

    teachers.push({
      name: teacher.name,
      _id: teacher._id,
      students: arr,
      payed: teacher.students.length ? getPayed(teacher.students) : null
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
    const { name, students } = req.body

    Teacher.find({ name: name })
      .select('name students')
      .exec()
      .then(teacher => {
        // checks if teacher exists
        if (teacher.length) {
          return res.status(409).json({
            message: "Teacher exists"
          })
        } else {
          const studentsArray = students.length ? students : [];
          const newTeacher = new Teacher({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            students: studentsArray
          })
          newTeacher.save()
            .then(() => next())
            .catch(err => console.log(err))
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },

  editTeacher(req, res, next) {
    Teacher
      .findOneAndUpdate(
        { _id: req.params.teacherId },
        { $set: { name: req.body.name } },
        { 'new': true }
      )
      .select('name students _id')
      .exec()
      .then(() => next())
      .catch(error =>
        res.status(500).json({
          error: error
        })
      )
  },

  removeTeacher(req, res, next) {
    Teacher
      .remove({ _id: req.params.teacherId })
      .select('name students _id')
      .exec()
      .then(() => next())
      .catch(error =>
        res.status(500).json({
          error: error
        })
      )
  }
}
