import ROOM_NAMES from '../../constants/rooms';

const ScoreboardMessageSender = {
  toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessage(messageType, message) {
    this.socket.emit(messageType, message);
  },
  sendMessageToAllScoreboards(messageType, message) {
    this.namespace.to(ROOM_NAMES.SCOREBOARD).emit(messageType, message);
  }
};

export default ScoreboardMessageSender;