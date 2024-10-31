const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BisectionDB');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectdb