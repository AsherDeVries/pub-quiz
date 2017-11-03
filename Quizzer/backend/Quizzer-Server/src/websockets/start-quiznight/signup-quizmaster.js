import config from '../../config.json';
import Quiznight from '../../models/Quiznight';
import randomstring from 'randomstring';
import createSocketIoNamespace from '../non-quizmaster';
import app from '../../app';
import MESSAGE_TYPES from '../constants/message_types';

export default (socket) => {
  socket.on(MESSAGE_TYPES.CONNECT_QUIZMASTER, (credentials) => {
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
          socket.emit(MESSAGE_TYPES.PENDING, `A quiznight could not be created because of the following reason: ${quiznightCode}`);
        } else {
          createSocketIoNamespace(quiznightCode);
          socket.emit(MESSAGE_TYPES.SIGN_UP_ERROR, { 'quiznightCode': quiznightCode });
        }
      });
    } else {
      socket.emit(MESSAGE_TYPES.SIGN_UP_ERROR, 'Wrong credentials');
    }
  });
}