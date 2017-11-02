'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nameSpaces = exports.createWebsocketServer = undefined;

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socketIOServer = function socketIOServer() {
  // Listen for websocket requests

  return {
    nameSpaces: []
  };
};

var createWebsocketServer = exports.createWebsocketServer = function createWebsocketServer() {
  return new _socket2.default(_app2.default.httpServer);
};
var nameSpaces = exports.nameSpaces = socketIOServer.nameSpaces;
//# sourceMappingURL=server.js.map