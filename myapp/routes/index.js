var express = require('express');
var router = express.Router();
const mainController = require('../controller/main');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', mainController.mainscreen);

router.get('/error', (req, res) => {
    throw new Error('cancle')
})

// module => 복습. 

module.exports = router;
