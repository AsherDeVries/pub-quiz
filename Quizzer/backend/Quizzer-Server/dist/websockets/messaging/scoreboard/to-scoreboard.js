'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rooms = require('../../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScoreboardMessageSender = {
  toNamespace: function toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket: function usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessage: function sendMessage(messageType, message) {
    this.socket.emit(messageType, message);
  },
  sendMessageToAllScoreboards: function sendMessageToAllScoreboards(messageType, message) {
    this.namespace.to(_rooms2.default.SCOREBOARD).emit(messageType, message);
  }
};

exports.default = ScoreboardMessageSender;
//# sourceMappingURL=to-scoreboard.js.map