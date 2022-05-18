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

//not email. not form.
router.post('/signup', body('email').isEmail().withMessage('아이디는 email 형태를 따르셔야 합니다.'),
  body('password').isLength({ min: 5 }).withMessage('비밀번호는 최소 5글자 이상입니다.')
  , (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
    const salt = bcrypt.genSaltSync(10);
    const bcryptpw = bcrypt.hashSync(req.body.password, salt); //12345

    userSchema.create({
      email: req.body.email,
      password: bcryptpw
    }).then(result => {
      res.status(200).json(result);
    });
  });

module.exports = router;
