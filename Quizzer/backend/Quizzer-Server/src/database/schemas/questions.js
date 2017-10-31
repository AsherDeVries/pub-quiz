import categoriesSchema from './categories';

let questionsPerRoundSchema = new Schema({
  _id: String,
  correctAnswer: String,
  category: [categoriesSchema]
});

export default questionsPerRoundSchema;