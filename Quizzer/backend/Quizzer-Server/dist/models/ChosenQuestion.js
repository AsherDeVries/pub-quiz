'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chosenquestions = require('../database/schemas/quiznights/quizrounds/chosenquestions');

var _chosenquestions2 = _interopRequireDefault(_chosenquestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.model('ChosenQuestion', _chosenquestions2.default);
//# sourceMappingURL=ChosenQuestion.js.map