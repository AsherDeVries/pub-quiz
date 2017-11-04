import app from '../app';
import enableFromQuizmasterWebsocketMessages from './messaging/quizmaster/from-quizmaster';
import enableFromScoreboardWebsocketMessages from './messaging/scoreboard/from-scoreboard';
import enableFromTeamsWebsocketMessages from './messaging/teams/from-teams';
import Quiznight from '../models/Quiznight';
import SocketIO from 'socket.io';

export const createWebsocketNamespaceForQuiznight = (quiznightCode) => {
  let webSocketServer = new SocketIO(app.httpServer);
  let quiznightNamespace = webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', (socket) => {
    enableFromQuizmasterWebsocketMessages(socket, quiznightNamespace);
    enableFromScoreboardWebsocketMessages(socket, quiznightNamespace);
    enableFromTeamsWebsocketMessages(socket, quiznightNamespace);
  });

  return quiznightNamespace;
}