const express = require('express');
const router = express.Router();

const {read, list, create } = require('../controller/BisectionController');

router.get('/', list);

//router.get('/:id', read);

router.post('/',create);

//debug
/*router.get('/',async (req, res) => {
    try {
        res.json("NAGIG");
    } catch (error) {
        console.error('List error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});*/



module.exports = router;