const mongoose = require('mongoose');

// Define the schema for the "dean" collection
const deanSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of email
  },
  
  password: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  }
});

// Create the "dean" model using the schema
const Dean = mongoose.model('dean', deanSchema);

module.exports = Dean;
