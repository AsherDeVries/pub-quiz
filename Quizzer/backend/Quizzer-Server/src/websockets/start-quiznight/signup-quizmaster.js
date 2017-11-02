import config from '../../config.json';
import Quiznight from '../../models/Quiznight';
import randomstring from 'randomstring';
import createSocketIoNamespace from '../non-quizmaster';
import app from '../../app';

export default (socket) => {
  socket.on('CONNECT_QUIZMASTER', (credentials) => {
    if(credentials.username === config.quizmaster_credentials.username && 
       credentials.password === config.quizmaster_credentials.password) {
      let quiznightCode = randomstring.generate({
        length: 6,
        charset: 'alphanumeric'
      });
      let qn = new Quiznight({
        _id: quiznightCode,
        teams: [],
        rounds: []
      });
  
      qn.save((err) => {
        if(err) {
          socket.emit('PENDING', `A quiznight could not be created because of the following reason: ${quiznightCode}`);
        } else {
          let nsp = createSocketIoNamespace(quiznightCode);
          socket.join('QUIZMASTER_ROOM');
          socket.emit('PENDING', `Welcome quizmaster!, a quiznight has been created with the code: ${quiznightCode}`);
        }
      });
    } else {
      socket.emit('SIGN_UP_ERROR', 'Wrong credentials');
    }
  });
}