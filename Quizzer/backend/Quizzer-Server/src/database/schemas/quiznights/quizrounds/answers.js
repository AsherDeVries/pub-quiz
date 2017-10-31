import { Schema } from 'mongoose';

let answersSchema = new Schema({
  value: String
}, { _id : false });

export default answersSchema;