import mongoose from 'mongoose';

import { db_name, db_port } from '../config.json';
import executeSeedScript from './seed-script';


export default () => {
  mongoose.Promise = global.Promise;
  const options = {useMongoClient: true, promiseLibrary: global.Promise};
  mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`, options, (err, db) => {
    if (db) {
      executeSeedScript();
    }
  });
}
