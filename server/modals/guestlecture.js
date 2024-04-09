const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarkSchema = new mongoose.Schema({
  from: { type: String},
  text: { type: String},
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
  yearAndSemester: { type: String, required: false },
  sectionsHandled: { type: Number, required: true },
  hours: { type: Number, required: false },
  startDate: { type: Date, required: true },
  proposedRate: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  accountDetails: {
    accountNumber: { type: String, required: false },
    accountHolderName: { type: String, required: false },
    bankName: { type: String, required: false },
    bankBranch: { type: String, required: false }
  },
  panCardNumber: { type: String, required: false },

  remarks: {
    type: [remarkSchema], 
    required: false
  },
  hod_id:{type: String},
  dean_id:{type: String},
  approved: {
    dean: { type: Boolean, default: false },
    registrar: { type: Boolean, default: false },
    viceChancellor: { type: Boolean, default: false },
    vpHR: { type: Boolean, default: false },
    proChancellor: { type: Boolean, default: false },
  },
  Accepted:{type: Boolean, default: false},
  PaymentRequest:{type:Boolean, default: false},
  paymentapproved: {
    hod: { type: Boolean, default: false },
    dean: { type: Boolean, default: false },
    registrar: { type: Boolean, default: false },
    viceChancellor: { type: Boolean, default: false },
    vpHR: { type: Boolean, default: false },
    proChancellor: { type: Boolean, default: false },
  }

});

const GuestLecture = mongoose.model('GuestLecture', guestLectureSchema);

module.exports = GuestLecture;
