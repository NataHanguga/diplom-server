const express = require('express')
const router = express.Router()
const {
    createEmployee, 
    getEmployees,
    getEmployeeById,
    removeEmployeeById,
    editEmployee
} = require('../utils/employeeStorage')

router
    .get('/', getEmployees)
    .get('/:employeeId', getEmployeeById)
    .post('/', createEmployee)
    .patch('/:employeeId', editEmployee)
    .delete('/:employeeId', removeEmployeeById)

module.exports = router