const express = require('express')
const router = express.Router()
const {getCategories, createCategory, editCategory,deleteCategory} = require('../utils/teacherCategoriesStorage')

router
    .get('/', getCategories)
    .post('/', createCategory)
    .patch('/:id', editCategory)
    .delete('/:id', deleteCategory)

module.exports = router