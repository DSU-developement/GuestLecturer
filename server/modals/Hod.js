const mongoose = require('mongoose');

// Define the schema for the "hod" collection
const hodSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of email
  },
  password: {
    type: String,
    required: true
  },
  deanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dean',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  deanEmail: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of email
  }
});

// Create the "hod" model using the schema
const Hod = mongoose.model('hod', hodSchema);

module.exports = Hod;
