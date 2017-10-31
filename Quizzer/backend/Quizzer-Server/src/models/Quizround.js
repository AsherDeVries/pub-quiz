import mongoose from 'mongoose';

import quizroundsSchema from '../database/schemas/quiznights/quizrounds';

export default mongoose.model('Quizround', quizroundsSchema);