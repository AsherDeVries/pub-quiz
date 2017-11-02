import category from './routes/categoryRoutes';
import bodyParser from 'body-parser';
import config from './config.json';
import express from 'express';
import establishDbConnection from './database/db';
import middleware from './middleware';
import errorHandler from './middleware/error-handling';

let app = express();

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

establishDbConnection();

app.use(middleware());

//setup routes
app.use('/categories', category());


app.use(errorHandler);

export default app;
