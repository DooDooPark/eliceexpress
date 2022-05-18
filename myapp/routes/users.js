var express = require('express');
const userSchema = require('../models/newuser');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('blog/auth');
});

module.exports = router;
