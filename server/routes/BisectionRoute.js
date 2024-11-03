const express = require('express');
const router = express.Router();

const { list, create, listone } = require('../controller/BisectionController');

router.get('/', list);



router.post('/',create);
router.get('/:id', listone);
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