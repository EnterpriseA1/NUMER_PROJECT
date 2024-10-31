
const BisectionDB = require('../models/BisectionDB');

// Get single bisection
exports.read = async (req, res) => {
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
};

// Get all bisections
exports.list = async (req, res) => {
    try {
        const results = await BisectionDB.find({});
        res.json(results);
    } catch (error) {
        console.error('List error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Create new bisection
exports.create = async (req, res) => {
    try {
        const result = (await BisectionDB.create(req.body));
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
};