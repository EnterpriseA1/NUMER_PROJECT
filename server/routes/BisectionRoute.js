const express = require('express');
const router = express.Router();

const {read, list, create } = require('../controller/BisectionController');

router.get('/bisection', list);
router.get('/bisection/:id', read);

router.post('/bisection',create);


/*router.put('/bisection', (req, res) => {
    res.send('Hello World! server is running put');
})
router.delete('/bisection', (req, res) => {
    res.send('Hello World! server is running delete');
    res.json()
})*/


module.exports = router;