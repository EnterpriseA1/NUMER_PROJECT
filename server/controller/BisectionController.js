
const BisectionDB = require('../models/BisectionDB');


// Get all bisections
const list = async (req, res) => {
    try {
        // Simple find with limit
        const result = await BisectionDB.find()
            .limit(20)  // Limit to 20 documents
            .select('-__v')  // Exclude version field
            .lean();  // Convert to plain JavaScript object

        return res.json({
            message: "NAGIG",
            data: result
        });

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