
const BisectionDB = require('../models/BisectionDB');
const test = require('../models/TEST');


// Get all 
const list = async (req, res) => {
    try {
        try {
            const result = await test.find();
            res.json( result );
        } catch (error) {
            console.error('List error:', error);
            res.status(500).json({ error: 'Server Error' });
        }
    }catch (error) {
        console.error('List error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
const listone =  async (req, res) => {
    try {
        const result = await Test.findOne({ _id: req.params.id }).exec();
        res.json( result );
    }catch(error) {
        console.error('List error:', error);
    }
};

// Create new     
const create = async (req, res) => {
    try {
        const result = (await BisectionDB.create(req.body));
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {  list, create , listone};