
const BisectionDB = require('../models/BisectionDB');

// Get single bisection
/*const   read = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await BisectionDB.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Read error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};*/

// Get all bisections
const list = async (req, res) => {
    try {
        // Add timeout to the database query
        const result = await BisectionDB.find().maxTimeMS(5000).lean();
        
        // Send response
        res.json({ message: "NAGIG" });
        
    } catch (error) {
        console.error('List error:', error);
        res.status(500).json({ error: 'Server Error' });
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