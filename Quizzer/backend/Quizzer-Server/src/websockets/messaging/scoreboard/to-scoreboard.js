import ROOM_NAMES from '../../constants/rooms';

const ScoreboardMessageSender = {
  toNamespace: function(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket: function (socket) {
    this.socket = socket;
    return this;
  },
  sendMessage: function(messageType, message) {
    this.socket.emit(messageType, message);
  },
  sendMessageToAllScoreboards: function(messageType, message) {
    this.namespace.to(ROOM_NAMES.SCOREBOARD).emit(messageType, message);
  }
};

export default ScoreboardMessageSender;