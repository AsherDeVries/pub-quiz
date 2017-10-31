'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _quizrounds = require('../database/schemas/quiznights/quizrounds');

var _quizrounds2 = _interopRequireDefault(_quizrounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.model('Quizround', _quizrounds2.default);
//# sourceMappingURL=Quizround.js.map