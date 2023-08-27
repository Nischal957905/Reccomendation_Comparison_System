import mongoose from 'mongoose';

//Model definition for the institution
const commentSchema = new mongoose.Schema({
  comment: {
    type: String
  },
  username: {
    type: String,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
