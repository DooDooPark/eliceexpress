const express = require('express');
const BookSchema = require('../models/book'); // 컨트롤러를
//작성했으면 지워도 무방.
const userSchema = require('../models/user');
const bookController = require('../controller/post');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('post');
});

router.get('/del', (req, res) => {
    res.render('delete')
});

router.get('/bookinfo/:id', bookController.getbookinfo);

// router.get('/bookinfo/:id', (req, res) => {
//     const authorname = req.params.id;
//     BookSchema.find({ auther: authorname })
//         .then(result => {
//             res.json(result);
//         }).catch(err => {
//             console.log(err);
//         });
// });

router.delete('/del/:id', (req, res) => {
    const bookname = req.params.id;

    BookSchema.findOneAndDelete({ bookname: bookname })
        .then(result => {
            res.json({ redirect: '/expost' });
        }).catch(err => {
            console.log(err);
        })
});

router.post('/del/:id', (req, res) => {
    const bookname = req.params.id;

    BookSchema.findOneAndDelete({ bookname: bookname })
        .then(result => {
            res.json({ redirect: '/expost' });
        }).catch(err => {
            console.log(err);
        })
});

//get post, put==> (업데이트, 수정), delete

router.post('/', (req, res) => {
    const name = req.body.name;
    const number = req.body.phone;
    const date = req.body.date;
    //요청.
    //응답.
    res.json({ name: name, number: number, date: date });
});
//          '/ ' ==> expost/addbook.
// router.post('/addbook', (req, res) => {
//     const bookname = req.body.bookname;
//     const auther = req.body.auther;
//     const price = req.body.price;
//     const date = req.body.date;

//     let bookData = new BookSchema({
//         bookname: bookname,
//         auther: auther,
//         price: price,
//         publish: date
//     });

//     bookData.save();
//     res.redirect('/expost');
// });

router.post('/addbook', bookController.addbook);

//bookinfo 에 있는 정보를 다 가져오는 코드.
//expost/getlist
router.get('/getlist', async (req, res) => {
    const result = await BookSchema.find({}).exec();
    return res.status(200).json(result);
    // const result = BookSchema.find({},(req,res)=>{
    // });
});
// error 핸들링. 

router.get('/users', (req, res) => {
    res.render('user');
})

router.post('/users', async (req, res, next) => {
    try {
        const userid = req.body.userid;
        const job = req.body.job;
        const user = new userSchema({
            userid: userid,
            job: job
        });
        const result = await user.save();
        res.status(200).json({
            result,
            message: 'user saved'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;