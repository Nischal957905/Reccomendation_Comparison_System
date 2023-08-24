import mongoose from 'mongoose';

//Model definition for the institution
const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);
export default Role;
