const express = require('express')
const router = express.Router()
const {getEducations, createEducation, editEducation, deleteEducation} = require('../utils/educationStorage')

router
    .get('/', getEducations)
    .post('/', createEducation)
    .patch('/:id', editEducation)
    .delete('/:id', deleteEducation)

module.exports = router