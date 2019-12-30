const mongoose = require('mongoose')
const { progressBar, payedMonth } = require('../utils/progressBar')
const Teacher = require('../models/teacher')

module.exports = {
  getStudentsbyTeacherId(req, res, next) {
    Teacher
      .findById(req.params.teacherId)
      .select('students')
      .exec()
      .then(result => {
        if (result) {
        res.status(200).json(result.students)
        } else {
          res.status(404).json({
            message: 'No valid entry found for provided ID'
          })
        }
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
              'studentType': studentType,
              'progress': [],
              'payed': false
            }
          }
        },
        { 'new': true })
      .select('students')
      .exec()
      .then(result => {
        if (result) {
          res.status(200).json(result.students)
        } else{
          res.status(404).json({
            message: 'No valid entry found for provided ID'
          })}
      })
      .catch(error =>
        res.status(500).json({
          error: error
        }))

  },

  editStudent(req, res, next) {
    const { teacherId, studentId } = req.params
    const { fullName, startDate, pay, classNumber, studentType, month } = req.body
    const progress = progressBar(req.body)
    const payed = payedMonth(progress, studentType, month)

    Teacher
      .findOneAndUpdate(
        { _id: teacherId, students: { $elemMatch: { _id: studentId } } },
        {
          $set: {
            'students.$.fullName': fullName,
            'students.$.startDate': startDate,
            'students.$.pay': pay,
            'students.$.classNumber': classNumber,
            'students.$.studentType': studentType,
            'students.$.progress': progress,
            'students.$.payed': payed
          }
        },
        { 'new': true }
      )
      .select('students')
      .exec()
      .then(result => {
        if (result) {
          res.status(200).json(result.students)
        } else {
          res.status(404).json({
            message: 'No valid entry found for provided ID'
          })
        }
      })
      .catch(error =>
        res.status(500).json({
          error: error
        }))
  },

  removeStudent(req, res, next) {
    Teacher
      .findOneAndUpdate(
        { '_id': req.params.teacherId },
        {
          $pull: {
            'students': {
              '_id': req.params.studentId
            }
          }
        },
        { 'new': true }
      )
      .select('students')
      .exec()
      .then(result => {
        if (result) {
          res.status(200).json(result.students)
        } else {
          res.status(404).json({
            message: 'No valid entry found for provided ID'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          error: error
        })
      })
  }
}