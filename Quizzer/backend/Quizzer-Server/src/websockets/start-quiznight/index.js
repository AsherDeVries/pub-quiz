import app from '../../app';
import Quiznight from '../../models/Quiznight';
import enableAcceptTeamsEvents from './accept-teams';

export default (quizmaster_credentials) => {
  app.webSocketServer.on('connection', (socket) => {
    enableAcceptTeamsEvents(socket);
  });
}