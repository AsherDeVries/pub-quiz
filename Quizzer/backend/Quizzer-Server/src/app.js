import api from './routes';
import bodyParser from 'body-parser';
import config from './config.json';
import express from 'express';
import establishDbConnection from './database/db';
import middleware from './middleware';

let app = express();

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

establishDbConnection();

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/', api({ config }));

export default app;
