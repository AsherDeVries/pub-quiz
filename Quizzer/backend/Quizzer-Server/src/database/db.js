import mongoose from 'mongoose';

import { db_name } from '../config.json';

export default () => {
	mongoose.connect('mongodb://localhost/' + db_name);
}
