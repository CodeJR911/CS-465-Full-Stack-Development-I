const express = require('express'); // express app
const router = express.Router(); // router logic

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.getAllTrips);

router
    .route('/trip/:tripCode')
    .get(tripsController.getTripByCode);

module.exports = router;