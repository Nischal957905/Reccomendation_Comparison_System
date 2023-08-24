import mongoose from 'mongoose';

//Model definition for the institution
const institutionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  opening_time:{
    type: String,
  },
  closing_time:{
    type: String,
  },
  friday_time: {
    type: String,
  },
  holidays: [{
    type: String,
  }],
  universities: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  success: {
    type: Number,
  },
  countries: [{
    type: String,
  }],
  specialization: [{
    type: String,
  }],
  online: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: String,
    default: 'Local',
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  }
});

const Institution = mongoose.model('Institution', institutionalSchema);
export default Institution;
