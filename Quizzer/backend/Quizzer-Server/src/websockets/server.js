import app from '../app';
import SocketIO from 'socket.io';

const socketIOServer = () => {
  // Listen for websocket requests

  return {
    nameSpaces: []
  }
}

export const createWebsocketServer = () => new SocketIO(app.httpServer);
export const nameSpaces = socketIOServer.nameSpaces;