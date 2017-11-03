import app from '../app';
import SocketIO from 'socket.io';

const socketIOServerState = {
  quizMasters: []
}

export const createWebsocketServer = () => new SocketIO(app.httpServer);