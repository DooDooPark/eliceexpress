var express = require('express');
const userSchema = require('../models/newuser');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { token } = require('morgan');
const session = require('express-session');
const parseurl = require('parseurl');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('blog/auth');
});

//정규 표현식. 
//passport

router.get('/cookie', (req, res) => {
  // "key-변수-이름"  "value-여러분 저장하고 싶은 값"
  res.cookie('drink', 'water');
  res.send('set cookies');
});


router.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true
  })
);  /// users.js => router 구간에서만 사용 가능하게끔 만들었습니다.
/// 프로젝트 전체 전역으로 사용하려면 어떻게 해야할지. 

router.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }
  // get the url pathname
  var pathname = parseurl(req).pathname
  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  next()
})

router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})
 
// Apache JMeter (아파치 제이미터) 
// 외래키를 타고,+타고+ 타고+ 3 ~ 4 가지의 개념을 
// // ==> 메모리 과부하를 줄이느냐. 
// 하나의 큰 쿼리 경우들이 많이 생깁니다.
// 1일 접속자 10만명단위를
// node pm2 ==> 서버 과부하가. 
// cpu 영역을 할당을 해서 계산을 분할해서 안정성 있게 처리해주는 역할.
// aws 로드 밸런싱 
// 컴퓯터 1대 === 3대로 
// 서버 터진다. ==> CPU 점유율이 초과 되거나. 메모리 용량 커버가 오버.CPU
// 1000명  1나의 영역. /// 25명 단위로 . 자동으로 나누어서 .
// 과부하에 대한 영역을 줄여주고 안정을 높여주는 역할을 합니다. 

// SPA ==> ReadableStreamDefaultController={, }

// React , vue, Svelte. // 왜 ??
// Web ==> SPA ==> 모바일. ==> 한 메뉴가. ==> 업로드 반영 -> 18시간. 
// SPA ==> 모바일 
//Saas B2B UI/UX ==> backㅢ 기능이 압도적으로 중요한. 

//not email. not form.
router.post('/signup', body('email').isEmail().withMessage('아이디는 email 형태를 따르셔야 합니다.'),
  body('password').isLength({ min: 5 }).withMessage('비밀번호는 최소 5글자 이상입니다.')
  , async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const findresult = await userSchema.findOne({ email: email });

    if (findresult) {
      //오류 //중복 가입.
      res.status(401).json({ msg: '이미 가입이 완료된 계정입니다.' });
    }

    else {
      // 가입완료.
      const salt = bcrypt.genSaltSync(10);
      const bcryptpw = bcrypt.hashSync(password, salt); //12345

      userSchema.create({
        email: email,
        password: bcryptpw
      }).then(result => {
        // console.log(result);
        res.status(200).json(result);
      });
    }
  });

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //가입을 했던 유저인지? 아닌지?
  const userdata = await userSchema.findOne({ email: email }).exec();

  if (!userdata) { //유저 데이터가 없다면.
    return res.status(401).json({ msg: '가입되지 않은 계정입니다.' });
  }

  else { //유저 데이터가 존재한다면. ==> 비밀번호가 매칭이되는지. 
    const pwMatch = bcrypt.compareSync(password, userdata.password);
    if (pwMatch) {
      res.status(200).json({ msg: 'OK' });
    } else {
      res.status(401).json({ msg: '비밀번호가 일치하지 않습니다.' });
    }
  }
});


router.get('/login', (req, res) => {
  res.render('blog/login');
});

module.exports = router;
