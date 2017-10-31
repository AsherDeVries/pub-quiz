import { Schema } from 'mongoose';

import teamsSchema from './quiznights/teams';
import quizroundsSchema from './quiznights/quizrounds';

let quiznightSchema = new Schema({
  _id: String,
  teams: [teamsSchema],
  rounds: [quizroundsSchema]
});

export default quiznightSchema;