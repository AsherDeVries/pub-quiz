import mongoose from 'mongoose';

import answersSchema from '../database/schemas/quiznights/quizrounds/answers';

export default mongoose.model('Answer', answersSchema);