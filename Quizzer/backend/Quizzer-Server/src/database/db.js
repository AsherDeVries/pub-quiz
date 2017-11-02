import mongoose from 'mongoose';

import { db_name, db_port } from '../config.json';

export default () => {
	mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`);
}
