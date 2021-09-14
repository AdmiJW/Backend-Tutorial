const mongoose = require('mongoose');
require('dotenv').config();


const connection = mongoose.createConnection( process.env.MONGODB_URL );
console.log("Successfully connected to MongoDB database!");

// Creates a Schema for users Collection.
const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    status: String
});
connection.model('User', userSchema);



// To obtain the connection, remember to use await or then()
module.exports = connection;