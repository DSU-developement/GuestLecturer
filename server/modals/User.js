const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schools = [
  { id: '1234', name: 'School of Health Sciences' },
  { id: '5678', name: 'School of Engineering' },
  { id: '91011', name: 'College of Journalism & Mass Communication' },
  { id: '121314', name: 'School of Basic & Applied Sciences' },
  { id: '151617', name: 'School of Commerce & Management' },
  { id: '181920', name: 'School of Law' }
];

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['HOD', 'Dean', 'HR', 'Registrar','ViceChancellor','ProChanCellor','CFO'], required: true },
  department: { type: String },
  school: {
    id: {
      type: String,
      required: true,
      enum: schools.map(school => school.id) // Enumerated list of IDs
    },
    name: {
      type: String,
      required: true,
      enum: schools.map(school => school.name) // Enumerated list of names
    }
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;