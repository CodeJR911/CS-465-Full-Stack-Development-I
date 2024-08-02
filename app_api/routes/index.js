const express = require('express'); // express app
const router = express.Router(); // router logic

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList); // GET method routes tripList

// GET Method routes tripsFindByCode - requires parameter
router 
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);


module.exports = router;