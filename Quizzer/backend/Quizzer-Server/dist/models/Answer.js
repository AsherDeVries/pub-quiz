'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _answers = require('../database/schemas/quiznights/quizrounds/answers');

var _answers2 = _interopRequireDefault(_answers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.model('Answer', _answers2.default);
//# sourceMappingURL=Answer.js.map