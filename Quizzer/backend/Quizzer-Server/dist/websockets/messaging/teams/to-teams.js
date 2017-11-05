'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rooms = require('../../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamMessageSender = {
  toNamespace: function toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket: function usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessageToSocketViaId: function sendMessageToSocketViaId(socketId, messageType, message) {
    this.namespace.to(socketId).emit(messageType, message);
  },
  sendMessageToAllTeams: function sendMessageToAllTeams(messageType, message) {
    this.namespace.to(_rooms2.default.TEAMS).emit(messageType, message);
  },
  disconnectSocket: function disconnectSocket(socketId) {
    this.namespace.to(socketId).leave(_rooms2.default.TEAMS);
  }
};

exports.default = TeamMessageSender;
//# sourceMappingURL=to-teams.js.map