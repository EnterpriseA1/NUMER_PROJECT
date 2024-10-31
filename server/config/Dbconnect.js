const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BisectionDB');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectdb