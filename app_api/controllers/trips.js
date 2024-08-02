const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const model = mongoose.model('trips');

// GET: /trips - lists all the trips

const tripList = async (req, res) => {
    const q = await model
        .find({})  // empty filter for all
        .exec();

    if(lq)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else {  // Return resulting trip list
        return res
            .ststus(200)
            .json(q);
    }

};

module.exports = {
    tripsList

};

// get: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // retrun single record
        .exec();

    if(lq)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};


module.exports = {
    tripsList,
    tripsFindByCode
};

