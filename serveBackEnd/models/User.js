import mongoose from 'mongoose';

//Model definition for the institution
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role_id: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  }
});

const User = mongoose.model('User', userSchema);
export default User;
