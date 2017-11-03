'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _Quiznight = require('../../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _nonQuizmaster = require('../non-quizmaster');

var _nonQuizmaster2 = _interopRequireDefault(_nonQuizmaster);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _message_types = require('../constants/message_types');

var _message_types2 = _interopRequireDefault(_message_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  socket.on(_message_types2.default.CONNECT_QUIZMASTER, function (credentials) {
    if (credentials.username === _config2.default.quizmaster_credentials.username && credentials.password === _config2.default.quizmaster_credentials.password) {
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
          socket.emit(_message_types2.default.PENDING, 'A quiznight could not be created because of the following reason: ' + quiznightCode);
        } else {
          var nsp = (0, _nonQuizmaster2.default)(quiznightCode);
          socket.join('QUIZMASTER_ROOM');
          socket.emit(_message_types2.default.PENDING, 'Welcome quizmaster!, a quiznight has been created with the code: ' + quiznightCode);
        }
      });
    } else {
      socket.emit(_message_types2.default.SIGN_UP_ERROR, 'Wrong credentials');
    }
  });
};
//# sourceMappingURL=signup-quizmaster.js.map