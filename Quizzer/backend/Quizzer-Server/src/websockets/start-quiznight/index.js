import app from '../../app';
import Quiznight from '../../models/Quiznight';
import enableSignupQuizmasterEvents from './signup-quizmaster';
import enableAcceptTeamsEvents from './accept-teams';

export default (quizmaster_credentials) => {
  app.webSocketServer.on('connection', (socket) => {
    enableSignupQuizmasterEvents(socket);
    enableAcceptTeamsEvents(socket);
  });
}