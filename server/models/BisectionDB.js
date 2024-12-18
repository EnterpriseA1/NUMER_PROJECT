const mongoose = require('mongoose');

const bisectionSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
    },
    Equation: {
        type: String,
        required: true
    },
    x_start: {
        type: Number,
        required: true
    },
    x_end: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    error: {
        type: String,
        required: true
    },
    
    // Add any other fields you need
}, { timestamps: true });

const BisectionDB = mongoose.model('bisections', bisectionSchema, 'bisections');

module.exports = BisectionDB;