'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _Quiznight = require('../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket, quizmaster_credentials) {
  socket.on('CONNECT_QUIZMASTER', function (credentials) {
    if (credentials.username === quizmaster_credentials.username && credentials.password === quizmaster_credentials.password) {
      var quiznightCode = _randomstring2.default.generate({
        length: 6,
        charset: 'alphanumeric'
      });
      var qn = new _Quiznight2.default({
        _id: quiznightCode,
        teams: [],
        rounds: []
      });

      qn.save(function (err) {
        if (err) {
          socket.emit('PENDING', 'A quiznight could not be created because of the following reason: ' + err);
        } else {
          socket.emit('PENDING', 'Welcome quizmaster!, a quiznight has been created with the code: ' + quiznightCode);
        }
      });
    } else {
      socket.emit('SIGN_UP_ERROR', 'Wrong credentials');
    }
  });
};
//# sourceMappingURL=from_quizmaster.js.map