const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const teacherRoutes = require('./api/routes/teachers')
const studentRoutes = require('./api/routes/students')
const url = 
    'mongodb+srv://admin:'+ 
    process.env.MONGO_ATLAS_PW +
    '@workers-hya0b.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) console.log('cannot connect to db')
    else console.log('create connection to db')
})
mongoose.set('useFindAndModify', false);

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next()
})

//connect routes 
app.use('/teachers', teacherRoutes)
app.use('/students', studentRoutes)

// error hendler
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app