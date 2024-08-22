const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Suppress the warning
const User = require('../models/user')




passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        try {
            const q = await User.findOne({ email: username }).exec();

            // Uncomment the following line to show results of query
            // on the console
            // console.log(q);

            if (!q) {
                return done(null, false, { message: 'Incorrect Username' });
            }
            if (!q.validPassword(password)) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, q);
        } catch (error) {
            return done(error);
        }
    }
));