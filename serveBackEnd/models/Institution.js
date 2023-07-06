import mongoose from 'mongoose';

const institutionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  opening_time:{
    type: String,
    required: false,
  },
  closing_time:{
    type: String,
    required: false,
  },
  friday_time: {
    type: String,
    required: false,
  },
  holidays: [{
    tyep: String,
    required: false,
  }],
  universities: {
    type: Number,
    required: false,
  },
  experience: {
    type: Number,
    required: false,
  },
  success: {
    type: Number,
    required: false,
  },
  countries: [{
    type: String,
    required: false,
  }],
  specialization: [{
    type: String,
    required: false,
  }],
  onine: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: String,
    default: 'Local',
  },
});

const Institution = mongoose.model('Institution', institutionalSchema);
export default Institution;
