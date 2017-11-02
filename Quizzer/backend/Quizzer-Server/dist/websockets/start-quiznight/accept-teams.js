'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _Quiznight = require('../../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _server = require('../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  socket.on('ACCEPT_TEAM', function (message) {
    if (!message.accepted) {
      _Quiznight2.default.update({ _id: message.quiznight }, { $pull: { teams: { _id: message.teamName } } }).then(function () {
        _app2.default.webSocketServer.to(message.socket_id).emit("PENDING", "You have been rejected to join this quiznight.");
        _app2.default.webSocketServer.to(socket.id).emit("PENDING", "You have been rejected to join this quiznight.");
      });
    }
  });
};
//# sourceMappingURL=accept-teams.js.map