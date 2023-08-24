import mongoose from 'mongoose';

//Model definition for the institution
const reviewSchema = new mongoose.Schema({
  review: {
    type: String
  },
  rating: {
    type: Number,
  },
  username: {
    type: String
  },
  institution_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution'
  },
  rating_classification: {
    type: String,
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
