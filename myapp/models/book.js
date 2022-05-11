const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    bookname: String,
    auther: String,
    price: {
        type: Number,
        default: 5000
    },
    publish: Date,
    sales: {
        type: Boolean,
        default: false,
    },
});

//서점 저장정보를 넣어두고. 
// 판매페이지. 관리페이지. 

const bookData = mongoose.model('bookinfo', book);
module.exports = bookData;