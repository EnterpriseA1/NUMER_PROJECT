const mongoose = require('mongoose');
const test = new mongoose.Schema({
    n : {
        type: Number
    },
    x : {
        type: Number
    },
    y : {
        type: Number
    },
    xto : {
        type: Number
    } 

}, { timestamps: true });

module.exports = mongoose.model('test', test);

