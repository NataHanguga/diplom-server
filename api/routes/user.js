const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validatinResult } = require('express-validator')

const User = require('../models/user')

router.post("/signup",
  [
    check('email', 'Incrrect email').isEmail(),
    check('password', 'Password is short').isLength(6)
  ],
 (req, res, next) => {

  const errors = validatinResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'Invalid data'
    })
  }

  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
       
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(() => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.delete("/:userId", (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email})
  .exec()
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }

    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }

      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, 
        process.env.MY_JWT_KEY,
        {
          expiresIn: '10h'
        })

        return res.status(200).json({
          message: 'Auth successful',
          token: token
        })
      }
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  })
})

module.exports = router
