const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('blog/blog');
});

//localhost:3000/blog

module.exports = router;