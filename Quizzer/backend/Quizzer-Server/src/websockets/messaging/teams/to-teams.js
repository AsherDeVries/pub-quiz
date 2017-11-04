import ROOM_NAMES from '../../constants/rooms';

const TeamMessageSender = {
  toNamespace: function(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket: function (socket) {
    this.socket = socket;
    return this;
  },
  sendMessageToSocketViaId: function(toSocketId, messageType, message) {
    this.namespace.to(message.socketId).emit(messageType, message);
  },
  sendMessageToAllTeams: function(messageType, message) {
    this.namespace.to(ROOM_NAMES.TEAMS).emit(messageType, message);
  },
  disconnectSocket: function(socketId) {
    quiznightNamespace.to(socketId).leave(ROOM_NAMES.TEAMS)
  }
};

export default TeamMessageSender;