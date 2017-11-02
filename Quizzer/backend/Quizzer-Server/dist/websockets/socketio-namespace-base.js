'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (io, quiznightCode) {
  var quiznightNamespace = io.of('/' + quiznightCode);

  quiznightNamespace.on('connection', function (socket) {
    socket.emit('PENDING', 'Welcome to the quiznight with code: ' + socket.nsp.name);
    quiznightNamespace.to('QUIZMASTER_ROOM').emit('A new team is waiting to join the quiznight!');
  });

  return quiznightNamespace;
};
//# sourceMappingURL=socketio-namespace-base.js.map