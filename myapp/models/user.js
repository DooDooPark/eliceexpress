const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true //collection 안에서 유일!! // id 중복 X 
    },
    job: {
        type: String,
        required: true
    }
});

const userData = mongoose.model('users', user);
module.exports = userData;