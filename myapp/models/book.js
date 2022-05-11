const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    bookname: String,
    auther: String,
    price: Number,
    publish: Date,
});

const bookData = mongoose.model('bookinfo', book);
module.exports = bookData;