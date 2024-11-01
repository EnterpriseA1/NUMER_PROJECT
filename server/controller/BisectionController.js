
const BisectionDB = require('../models/BisectionDB');


// Get all bisections
const list = async (req, res) => {
    try {
        const data = await BisectionDB.find()
            .limit(5)
            .lean();

        console.log('Query result:', data); // Debug log

        return res.status(200).json({
            success: true,
            data: data || []
        });

    } catch (error) {
        console.error('Detailed error:', error); // Debug log
        return res.status(500).json({
            success: false,
            error: 'Database query failed',
            details: error.message
        });
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