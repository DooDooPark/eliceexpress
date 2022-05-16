const express = require('express');
const blogSchema = require('../models/blog');
const router = express.Router();

//localhost:3000/blog

router.get('/', (req, res) => {
    res.render('blog/blog');
});

router.get('/write', (req, res) => {
    res.render('blog/write');
});

router.post('/write', (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    const blogText = new blogSchema({
        title: title,
        content: content,
    });

    blogText.save().then(result => {
        console.log(result);
        res.redirect('/blog');
    }).catch(err => {
        console.log(err);
        next(err);
    })
});

//localhost:3000/blog

module.exports = router;