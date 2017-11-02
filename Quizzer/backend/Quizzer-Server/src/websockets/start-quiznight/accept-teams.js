import app from '../../app';
import Quiznight from '../../models/Quiznight';
import { socketIO } from '../server';

export default (socket) => {  
  socket.on('ACCEPT_TEAM', (message) => {
    if(!message.accepted) {
      Quiznight.update(
        { _id: message.quiznight },
        { $pull: { teams: { _id: message.teamName } } }
      ).then(() => {
        app.webSocketServer.to(message.socket_id).emit("PENDING", "You have been rejected to join this quiznight.");
        app.webSocketServer.to(socket.id).emit("PENDING", "You have been rejected to join this quiznight.");
      });
    }
  });
}