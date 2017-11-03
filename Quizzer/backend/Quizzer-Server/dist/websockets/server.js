'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isQuizmaster = exports.createWebsocketServer = undefined;

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socketIOServerState = {
  quizMasters: []
};

var createWebsocketServer = exports.createWebsocketServer = function createWebsocketServer() {
  return new _socket2.default(_app2.default.httpServer);
};
var isQuizmaster = exports.isQuizmaster = function isQuizmaster(socket) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = socketIOServerState.quizMasters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var s = _step.value;

      console.log('check socket id: ' + socket.id);
      console.log('with socket id: ' + s.id);
      if (s == socket) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
};
//# sourceMappingURL=server.js.map