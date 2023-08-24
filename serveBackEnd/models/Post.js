import mongoose from 'mongoose';

//Model definition for the institution
const postSchema = new mongoose.Schema({
  post: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tag: {
    type: String
  }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
