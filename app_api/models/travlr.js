const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/travlr', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// define the trip schema
const tripSchema = new mongoose.Schema({
    
    code: {type: String, required: true, index: true },
    name: {type: String, required: true, index: true},
    length: {type: String, required: true},
    start: {type: Date, required: true},
    resort: {type: String, required: true},
    perPerson: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true}

});


// Build the connection string and set the connection timeout.
// timeout is in milliseconds.
const connect = () => {
setTimeout(() => mongoose.connect(dbURI, {
}), 1000);
}
// Monitor connection events
mongoose.connection.on('connected', () => {
console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
console.log('Mongoose disconnected');
});
// Windows specific listner
if(process.platform === 'win32'){
const r1 = readLine.createInterface({
input: process.stdin,
output: process.stdout
});
r1.on('SIGINT', () => {
process.emit("SIGINT");
});
}
// Configure for Graceful Shutdown
const gracefulShutdown = (msg) => {
mongoose.connection.close(() => {
console.log(`Mongoose disconnected through ${msg}`);
});
};
// Event Listeners to process graceful shutdowns
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
// Make initial connection to DB
connect();
// Import Mongoose schema
require('./travlr');
module.exports = mongoose;

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;

