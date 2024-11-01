
const BisectionDB = require('../models/BisectionDB');


// Get all bisections
const list = async (req, res) => {
    try {
        // Use the optimized static method
        const results = await BisectionDB.findLatest(5);
        return res.json(results);
    } catch (error) {
        console.error('List error:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

// Create new bisection     
const create = async (req, res) => {
    try {
        const result = (await BisectionDB.create(req.body));
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {  list, create };