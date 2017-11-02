import app from './app';
import { createWebsocketServer } from './websockets/server';
import config from './config.json';
import http from 'http';
import enableWebsockets from './websockets';

app.httpServer = http.createServer(app);
app.webSocketServer = createWebsocketServer();

enableWebsockets(config, app.httpServer);

// Listen for http requests
app.httpServer.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.httpServer.address().port}`);
});