import app from '../../app';
import Quiznight from '../../models/Quiznight';
import { socketIO } from '../server';
import MESSAGE_TYPES from '../constants/message_types';

export default (socket) => {  
  socket.on(MESSAGE_TYPES.ACCEPT_TEAM, (message) => {
    if(!message.accepted) {
      Quiznight.update(
        { _id: message.quiznight },
        { $pull: { teams: { _id: message.teamName } } }
      ).then(() => {
        app.webSocketServer.to(message.socket_id).emit(MESSAGE_TYPES.PENDING, "You have been rejected to join this quiznight.");
        app.webSocketServer.to(socket.id).emit(MESSAGE_TYPES.PENDING, "You have been rejected to join this quiznight.");
      });
    }
  });
}