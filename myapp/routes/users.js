var express = require('express');
const userSchema = require('../models/newuser');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { token } = require('morgan');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('blog/auth');
});

//정규 표현식. 
//passport

// 프로그래밍 => 디지털 트랜포메이션. 
// 실제 생활에 있는걸 ====> 컴퓨터 적으로 옮기는 일.
// 삽질 90%.......

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

/// 홍보 X 
/// 카드 결제를 앱 => 카드사 승인. 

/// 베타서비스에 앱을 올리기를 <== 카드사.  // 실물 거래. // 상품 보장성. // 환불 요청 // 현금

//// 구글 로그인, 네이버 로그인, 카카오 로그인. SNS 로그인.
//// 가입 이후에 개인정보를 적어달라고. XXXXX.

//// 개인 정보가 필요한 구간 ==> 배송. 
//// 베타 서비스 앱 노출된 시간이 굉장히 굉장히 제작 4개월... 노출 5개월. 

///// 로그인 계정 300명.... 아임포트. 테스트로 결제. 
//// 너무 이상.... ...... 더미 계정....==> 앱에서 타고들어와서. ==> 저의 API 를 눌러본겁니다.
//// 카카오 , 네이버 로그인 XXXX
//// goole analyticsg. ==> analytics bot. ==> google auth. // 슈퍼 open api. 전역 공개.

router.get('/login', (req, res) => {
  res.render('blog/login');
});

module.exports = router;
