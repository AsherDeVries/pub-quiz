'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('./server');

exports.default = function (quiznightCode) {
  var quiznightNamespace = _server.socketIO.of('/' + quiznightCode);

  quiznightNamespace.on('connection', function (socket) {
    socket.emit('PENDING', 'Welcome to the quiznight with code: ' + socket.nsp.name);
    var s = (0, _server.socketIO)('/');
    s.emit('A new team is waiting to join the quiznight!');
  });

  return quiznightNamespace;
};
//# sourceMappingURL=socketio-namespace-creator.js.map