import { Schema } from 'mongoose';

let questionsSchema = new Schema({
  _id: String,
  correctAnswer: {
    type: String,
    required: true
  },
  category: {
      type: String,
      required: true,
      ref: 'Category'
  }
});

export default questionsSchema;
