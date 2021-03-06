import mongoose from 'mongoose';

let questionSchema = new mongoose.Schema({
  _id: String,
  answer: {
    type: String,
    required: true
  },
  category: {
      type: String,
      required: true,
      ref: 'Category'
  }
});

export default mongoose.model('Question', questionSchema);
