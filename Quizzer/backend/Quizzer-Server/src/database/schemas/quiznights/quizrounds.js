import { Schema } from 'mongoose';

import teamStatisticsSchema from './quizrounds/teamstatistics';
import chosenQuestionsSchema from './quizrounds/chosenquestions';

let quiznightRoundSchema = new Schema({
  _id: Number,
  teamStatistics: [teamStatisticsSchema],
  chosenQuestions: [chosenQuestionsSchema]
});

export default quiznightRoundSchema;