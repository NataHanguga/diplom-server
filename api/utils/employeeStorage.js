const mongoose = require('mongoose')
const Employee = require('../models/employee')
const { getEmployeesArray } = require('./employeeResponceGenerate')

module.exports = {
    getEmployees(req, res, next) {
        Employee
            .find()
            .select(`
                fullName position category year
                experience education teachHours 
                concertHours teachRank additionalPosition 
                addTeachHours addConcertHours department
            `)
            .exec()
            .then(result => {
                if (result.length >= 0) {
                    res.status(200).json(getEmployeesArray(result))
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

    createEmployee(req, res, next) {
        const {
            fullName,
            position,
            category,
            year,
            experience,
            education,
            teachHours,
            concertHours,
            teachRank,
            additionalPosition,
            addTeachHours,
            addConcertHours,
            department } = req.body;

        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            fullName: fullName,
            position: position,
            category: category,
            year: year,
            experience: experience,
            teachRank: teachRank,
            education: education,
            teachHours: teachHours,
            concertHours: concertHours,
            additionalPosition: additionalPosition,
            addTeachHours: addTeachHours,
            addConcertHours: addConcertHours,
            department: department
        })

        employee
            .save((err, data) => {
                if (err) res.status(500).json({
                    error: err
                })
                else res.status(200).json(data)
            })
    },

    getEmployeeById(req, res, next) {
        const { employeeId } = req.params;

        Employee
            .findById(employeeId)
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json(result)
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

    editEmployee(req, res, next) {
        const { employeeId } = req.params;
        const {
            fullName,
            position,
            category,
            year,
            experience,
            education,
            teachHours,
            concertHours,
            teachRank,
            additionalPosition,
            addTeachHours,
            addConcertHours,
            department } = req.body;

        let updateEmployee;

        if (position === 'teacher') {
            updateEmployee = Employee
                .findOneAndUpdate(
                    { _id: employeeId },
                    {
                        $set:
                        {
                            fullName: fullName,
                            position: position,
                            category: category,
                            year: year,
                            experience: experience,
                            teachRank: teachRank,
                            education: education,
                            teachHours: teachHours,
                            concertHours: concertHours,
                            additionalPosition: additionalPosition,
                            addTeachHours: addTeachHours,
                            addConcertHours: addConcertHours,
                            department: department
                        }
                    },
                    { 'new': true }
                )
        } else {
            updateEmployee = Employee
                .findOneAndUpdate(
                    { _id: employeeId },
                    {
                        $set:
                        {
                            fullName: fullName,
                            position: position
                        }
                    },
                    { 'new': true }
                )
        }
        updateEmployee
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

    removeEmployeeById(req, res, next) {
        const { employeeId } = req.params;

        Employee
            .remove({ _id: employeeId })
            .exec()
            .then(result =>
                res.status(200).json('OK')
            )
            .catch(error =>
                res.status(500).json({
                    error: error
                })
            )
    }
}