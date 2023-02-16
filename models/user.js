const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  code: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
  otp: { type: Number, required: true },
  resetAttempts: { type: Number, required: true },
});

module.exports = mongoose.model('User', UserSchema);
