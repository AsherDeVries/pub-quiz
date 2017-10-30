import http from 'http';
import app from "./app";
import config from './config.json';

app.server = http.createServer(app);

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});