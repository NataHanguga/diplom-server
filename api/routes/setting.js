const express = require('express');
const router = express.Router();

const positionRoutes = require('./position')
const gradeRoutes = require('./grade')
const percentRoutes = require('./percent')
const studentPayRoutes = require('./studentPay')
const teacherCategoryRoutes = require('./teacherCategories')
const teacherRankRoutes = require('./teacherRank')
const educationRoutes = require('./education')
const additionalPositionRoutes = require('./additionalPosition')

router
    .use('/position', positionRoutes)
    .use('/grade', gradeRoutes)
    .use('/percent', percentRoutes)
    .use('/pay', studentPayRoutes)
    .use('/category', teacherCategoryRoutes)
    .use('/rank', teacherRankRoutes)
    .use('/education', educationRoutes)
    .use('/additional-position', additionalPositionRoutes)

module.exports = router;
