import mongoose from 'mongoose';

let categoriesSchema = new mongoose.Schema({
  _id: String
});

export default mongoose.model('Category', categoriesSchema);
