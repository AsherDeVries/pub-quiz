'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message_types = require('../../constants/message_types');

var _message_types2 = _interopRequireDefault(_message_types);

var _rooms = require('../../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket, quiznightNamespace) {
  socket.on(_message_types2.default.CONNECT_SCOREBOARD, function (message) {
    socket.join(_rooms2.default.SCOREBOARD);
  });
};
//# sourceMappingURL=from-scoreboard.js.map