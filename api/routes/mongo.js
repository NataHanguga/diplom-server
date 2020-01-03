const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
    const url = 
    `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@workers-hya0b.mongodb.net/test?retryWrites=true&w=majority`

    mongoose.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            console.log('cannot connect to db');
            req.statusCode(500).json({
                message: 'DB connection failed'
            })
        } else {
            console.log('create connection to db')
            req.statusCode(200).json({
                message: 'DB connection successful'
            })
        }
    })

    mongoose.set('useFindAndModify', false);
});

module.exports = router
