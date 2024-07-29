const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const model = mongoose.model('trips');

// GET: /trips - lists all the trips

const getAllTrips = async (req, res) => {
    const q = await model
        .find({})  // empty filter for all
        .exec((err, trips) => {
            if(!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found"});

            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res 
                    .status(200)
                    .json(trips);
            }
        });
};

// get: /trips/:tripCode - lists a single trip
const getTripByCode = async (req, res) => {
    model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res  
                    .status(404)
                    .json({"message": "That trip was not found"});

            } else if (err) {
                return res  
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip)

            }
        });
};

module.exports = {
    getAllTrips,
    getTripByCode
};

