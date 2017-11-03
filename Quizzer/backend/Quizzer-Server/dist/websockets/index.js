'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _startQuiznight = require('./start-quiznight');

var _startQuiznight2 = _interopRequireDefault(_startQuiznight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref, server) {
  var quizmaster_credentials = _ref.quizmaster_credentials;

  (0, _startQuiznight2.default)(quizmaster_credentials);
};
//# sourceMappingURL=index.js.map