import { Schema } from 'mongoose';

let teamsSchema = new Schema({
  _id: String,
  roundPoints: Number
});

export default teamsSchema;