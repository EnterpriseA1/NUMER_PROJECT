// routes/index.js
const express = require('express');
const router = express.Router();
const bisectionRoute = require('./BisectionRoute');
// Add other routes here
// const newRoute = require('./NewRoute');

// Register all routes
router.use('/bisection', bisectionRoute);
// router.use('/newpath', newRoute);
 
module.exports = router;