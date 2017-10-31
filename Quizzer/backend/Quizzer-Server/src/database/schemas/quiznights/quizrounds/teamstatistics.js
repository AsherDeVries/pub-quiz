import { Schema } from 'mongoose';

import answersSchema from './answers';

let teamstatisticsSchema = new Schema({
  team: String,
  givenAnswers: [answersSchema],
  correctAnswersAmount: Number
}, { _id : false });

export default teamstatisticsSchema;