import mongoose from 'mongoose';

import categoriesSchema from '../database/schemas/categories'

export default mongoose.model('Category', categoriesSchema);