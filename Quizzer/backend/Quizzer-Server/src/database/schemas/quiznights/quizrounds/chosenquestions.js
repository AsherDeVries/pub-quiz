import { Schema } from 'mongoose';

let chosenquestionsSchema = new Schema({
  _id: String,
  hasBeenReviewed: Boolean
});

export default chosenquestionsSchema;