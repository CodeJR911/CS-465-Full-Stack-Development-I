const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Centralized Connection Function
const connect = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Mongoose connected to ${dbURI}`);
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
};

// Shutdown invoked by nodemon signal                                
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
  
});
// Shutdown invoked by app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
    process.exit(0);
  
});
// Shutdown invoked by container termination
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
    process.exit(0);
  
});

// Make Initial connection to DB
connect();

// Import Mongoose schema
require('./travlr');
module.exports = mongoose;