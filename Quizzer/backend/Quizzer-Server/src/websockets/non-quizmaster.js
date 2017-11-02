import app from '../app';
import Quiznight from '../models/Quiznight';

export default (quiznightCode) => {
  let quiznightNamespace = app.webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', (socket) => {
    socket.emit('PENDING', `Welcome to the quiznight with code: ${socket.nsp.name}! Send your teamname to join.`);
    // TODO: refactor code below to redirect quizmaster to created namespace
    
    socket.on('CONNECT_TEAM', (message) => {
      console.log(socket.id);
      Quiznight.update(
        { _id: socket.nsp.name.substr(1) },
        { $push: { teams: { _id: message.teamName, roundPoints: 0 } } })
        .then(app.webSocketServer.to('QUIZMASTER_ROOM').emit('PENDING', { 
          'message' : `A new team with name: "${message.teamName}" and socket id: "${socket.id}" is waiting to join the quiznight with code ${socket.nsp.name}` 
        }));
      });
    });

  return quiznightNamespace;
}