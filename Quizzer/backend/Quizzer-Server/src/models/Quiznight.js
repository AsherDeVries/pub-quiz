import mongoose from 'mongoose';

import quiznightsSchema from '../database/schemas/quiznights';

export default mongoose.model('Quiznight', quiznightsSchema);
