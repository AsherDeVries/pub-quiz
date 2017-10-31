import mongoose from 'mongoose';

import teamsSchema from '../database/schemas/quiznights/teams';

export default mongoose.model('Team', teamsSchema);