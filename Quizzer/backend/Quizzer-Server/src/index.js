import app from './app';
import config from './config.json';
import http from 'http';

app.httpServer = http.createServer(app);

// Listen for http requests
app.httpServer.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.httpServer.address().port}`);
});