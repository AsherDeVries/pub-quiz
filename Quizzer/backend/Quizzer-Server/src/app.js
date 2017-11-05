import category from './routes/categoryRoutes';
import question from './routes/questionRoutes';
import quiznightRoute from './routes/quiznightRoutes';
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(middleware());

//setup endpoints
app.use('/categories', category());
app.use('/questions', question());
app.use('/quiznights', quiznightRoute())


app.use(errorHandler);

export default app;

module.exports = app;
