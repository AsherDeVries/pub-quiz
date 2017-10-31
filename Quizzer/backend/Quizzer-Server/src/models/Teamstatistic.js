import mongoose from 'mongoose';

import teamstatisticsSchema from '../database/schemas/quiznights/quizrounds/teamstatistics';

export default mongoose.model('Teamstatistic', teamstatisticsSchema);