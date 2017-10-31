import mongoose from 'mongoose';

import chosenquestionsSchema from '../database/schemas/quiznights/quizrounds/chosenquestions';

export default mongoose.model('ChosenQuestion', chosenquestionsSchema);