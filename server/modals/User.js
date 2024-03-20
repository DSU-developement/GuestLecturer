const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['HOD', 'Dean', 'HR', 'Registrar','ViceChancellor','ProChanCellor','CFO'], required: true },
  department: { type: String },
  school: {type:String , enum:['School of Health Sciences', 'School of Engineering', 'College of Journalism & Mass Communication',  'School of Basic & Applied Sciences', 'School of Commerce & Management', 'School of Law']}
});


const User = mongoose.model('User', userSchema);

module.exports = User;