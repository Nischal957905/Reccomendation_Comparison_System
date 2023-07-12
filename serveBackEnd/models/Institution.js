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
    tyep: String,
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
