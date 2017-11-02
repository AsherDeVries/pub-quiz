'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _Quiznight = require('../../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _signupQuizmaster = require('./signup-quizmaster');

var _signupQuizmaster2 = _interopRequireDefault(_signupQuizmaster);

var _acceptTeams = require('./accept-teams');

var _acceptTeams2 = _interopRequireDefault(_acceptTeams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (quizmaster_credentials) {
  _app2.default.webSocketServer.on('connection', function (socket) {
    (0, _signupQuizmaster2.default)(socket);
    (0, _acceptTeams2.default)(socket);
  });
};
//# sourceMappingURL=index.js.map