'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWebsocketNamespaceForQuiznight = undefined;

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _fromQuizmaster = require('./messaging/quizmaster/from-quizmaster');

var _fromQuizmaster2 = _interopRequireDefault(_fromQuizmaster);

var _fromScoreboard = require('./messaging/scoreboard/from-scoreboard');

var _fromScoreboard2 = _interopRequireDefault(_fromScoreboard);

var _fromTeams = require('./messaging/teams/from-teams');

var _fromTeams2 = _interopRequireDefault(_fromTeams);

var _Quiznight = require('../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createWebsocketNamespaceForQuiznight = exports.createWebsocketNamespaceForQuiznight = function createWebsocketNamespaceForQuiznight(quiznightCode) {
  var webSocketServer = new _socket2.default(_app2.default.httpServer);
  var quiznightNamespace = webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', function (socket) {
    (0, _fromQuizmaster2.default)(socket, quiznightNamespace);
    (0, _fromScoreboard2.default)(socket, quiznightNamespace);
    (0, _fromTeams2.default)(socket, quiznightNamespace);
  });

  return quiznightNamespace;
};
//# sourceMappingURL=index.js.map