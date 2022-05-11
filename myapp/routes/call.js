const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('hello express');
});

router.get('/member', (req, res) => {
    res.send('call member');
});

router.get('/node', (req, res) => {
    res.send('node member');
});

router.get('/node2', (req, res) => {
    console.log('node test');
    res.send('node2 member');
});

router.get('/node3', (req, res) => {
    res.send('node3');
});

// /asdfasdfaqwet/a
// localhost:3000/text/member/name/

router.get('/member/name/:id', (req, res) => {
    res.send('call member');
    //database call .
    // search. 
});


router.get('/member/:id', (req, res) => {
    const member = req.params.id;
    console.log(member);
    res.send(`${member}`);
});

/// API 문서.
/// 함수 
/// post   url /test/member/:id    ===> 회원의 id 로 한다. 회원의 DB key 로 한다.
/// 

// Single 쓰레드. 기반으로 빠르게 처리하는..


// 요청... => 위치 Router =>  우리가 원하는 기능을 함수. 미들웨어.  => 응답

router.get('/', (req, res, next) => {
    //request //response // next
});


module.exports = router; // ==> app.js