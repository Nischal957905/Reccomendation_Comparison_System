import mongoose from 'mongoose';

//Model definition for the institution
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  accreditation: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website_url: {
    type: String,
  },
  opening_time:{
    type: String,
  },
  closing_time:{
    type: String,
  },
  ownership: {
    type: String,
  },
  experience: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  established: {
    type: Date,
  }
});

const School = mongoose.model('School', schoolSchema);
export default School;
