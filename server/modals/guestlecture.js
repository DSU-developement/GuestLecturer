const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarkSchema = new mongoose.Schema({
  from: { type: String, required: true },
  text: { type: String, required: true },
  isSolved: { type: Boolean, default: false }
});

const guestLectureSchema = new Schema({
  facultyName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: {type:String, required: true},
  qualifications: {
    ug: { type: String },
    pg: { type: String },
    phd: { type: String }
  },
  schoolsDeanery: { type: String },
  department: { type: String, required: true },
  subjectName: { type: String, required: true },
  yearAndSemester: { type: String, required: true },
  sectionsHandled: { type: Number, required: true },
  hours: { type: Number, required: true },
  startDate: { type: Date, required: true },
  proposedRate: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  accountDetails: {
    accountNumber: { type: String, required: true, minlength: 14, maxlength: 14 },
    accountHolderName: { type: String, required: true },
    bankName: { type: String, required: true },
    bankBranch: { type: String, required: true }
  },
  panCardNumber: { type: String, required: true },
  remarks: {
    type: [remarkSchema], 
    required: false
  },
  dept_id:{type: Number},
  dean_id:{type: Number},
  approved: {
    hod: { type: Boolean, default: false },
    dean: { type: Boolean, default: false },
    registrar: { type: Boolean, default: false },
    viceChancellor: { type: Boolean, default: false },
    vpHR: { type: Boolean, default: false },
    proChancellor: { type: Boolean, default: false },
    cfo: { type: Boolean, default: false }
  }

});

const GuestLecture = mongoose.model('GuestLecture', guestLectureSchema);

module.exports = GuestLecture;
