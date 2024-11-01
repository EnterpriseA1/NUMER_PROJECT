const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://EnterpriseA:DhZRZHHQQ9Erm4E@cluster0.7nfhz.mongodb.net/BisectionDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

module.exports = connectdb;