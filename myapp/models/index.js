const mongoose = require('mongoose');
const connect = require('../dbconfig');
const url = 'mongodb://' + connect.username + ':' + connect.password
    + '@' + connect.url + '/' + connect.dbname;


const dbconnect = () => {
    mongoose.connect(
        url,
        error => {
            if (error) {
                console.log("mongodb connect error", error);
            } else {
                console.log("mongodb-connect-success");
            }
        }
    );
};

mongoose.connection.on('error', error => {
    console.log('mongodb connection error', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('mongodb disconnected try reconnect....');
});

module.exports = dbconnect;