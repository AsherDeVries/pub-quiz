import ROOM_NAMES from '../../constants/rooms';
import { getQuiznightCodeFromSocket } from '../../utils';

const TeamMessageSender = {
  toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessageToSocketViaId(socketId, messageType, message) {
    this.namespace.to(socketId).emit(messageType, message);
  },
  sendMessageToAllTeams(messageType, message) {
    this.namespace.to(ROOM_NAMES.TEAMS).emit(messageType, message);
  },
  disconnectSocket(socketId) {
    this.namespace.to(socketId).leave(ROOM_NAMES.TEAMS);
  }
};

export default TeamMessageSender;