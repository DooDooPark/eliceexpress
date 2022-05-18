var express = require('express');
const userSchema = require('../models/newuser');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('blog/auth');
});

//정규 표현식. 
//passport


router.post('/signup', body('email').isEmail(),
  body('password').isLength({ min: 5 })
  , (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
  });

module.exports = router;
