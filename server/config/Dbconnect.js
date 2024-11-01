const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BisectionDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 3000, // Reduce timeout
            socketTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB connection error:', error);
    }
}

module.exports = connectdb;