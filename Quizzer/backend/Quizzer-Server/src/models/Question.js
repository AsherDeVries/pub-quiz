import mongoose from 'mongoose';

import questionSchema from '../database/schemas/questions';

export default mongoose.model('Question', questionSchema);