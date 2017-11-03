'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _Quiznight = require('../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

<<<<<<< Updated upstream
var _message_types = require('./constants/message_types');

var _message_types2 = _interopRequireDefault(_message_types);
=======
var _server = require('./server');
>>>>>>> Stashed changes

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (quiznightCode) {
  var quiznightNamespace = _app2.default.webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', function (socket) {
<<<<<<< Updated upstream
    socket.emit(_message_types2.default.PENDING, 'Welcome to the quiznight with code: ' + socket.nsp.name + '! Send your teamname to join.');
    // TODO: refactor code below to redirect quizmaster to created namespace

    socket.on(_message_types2.default.CONNECT_TEAM, function (message) {
=======
    socket.on('CONNECT_QUIZMASTER', function () {
      socket.join('QUIZMASTER_ROOM');
      _app2.default.webSocketServer.to('QUIZMASTER_ROOM').emit('PENDING', 'Welcome to the quiznight quizmaster!, waiting for teams to apply..');
    });
    socket.emit('PENDING', 'Welcome to the quiznight! Send your teamname to join.');
    // TODO: refactor code below to redirect quizmaster to created namespace

    socket.on('CONNECT_TEAM', function (message) {
>>>>>>> Stashed changes
      _Quiznight2.default.update({ _id: socket.nsp.name.substr(1) }, { $push: { teams: { _id: message.teamName, roundPoints: 0 } } }).then(_app2.default.webSocketServer.to('QUIZMASTER_ROOM').emit('PENDING', {
        'message': 'A new team with name: "' + message.teamName + '" and socket id: "' + socket.id + '" is waiting to join the quiznight with code ' + socket.nsp.name
      }));
    });

    socket.on('NEXT_QUESTION', function (message) {});
  });

  return quiznightNamespace;
};
//# sourceMappingURL=non-quizmaster.js.map