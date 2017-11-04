import ROOM_NAMES from '../../constants/rooms';

const QuizmasterMessageSender = {
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
  sendMessageToQuizmaster: function(messageType, message) {
    this.namespace.to(ROOM_NAMES.QUIZMASTER).emit(messageType, message);
  }
};

export default QuizmasterMessageSender;