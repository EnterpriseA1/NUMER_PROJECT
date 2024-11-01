
const BisectionDB = require('../models/BisectionDB');


// Get all bisections
const list = async (req, res) => {
    // Add timeout to the request
    res.setTimeout(5000, () => {
        return res.status(504).json({ error: 'Request timeout' });
    });

    try {
        // Simple query with no additional operations
        const result = await BisectionDB.find()
            .limit(10)  // Limit the results
            .select('Equation x_start x_end result error')  // Select only needed fields
            .lean()
            .exec();  // Execute the query immediately

        // Send immediate response
        return res.status(200).json({
            status: 'success',
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