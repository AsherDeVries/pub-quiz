'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _answers = require('./answers');

var _answers2 = _interopRequireDefault(_answers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teamstatisticsSchema = new _mongoose.Schema({
  team: String,
  givenAnswers: [_answers2.default],
  correctAnswersAmount: Number
}, { _id: false });

exports.default = teamstatisticsSchema;
//# sourceMappingURL=teamstatistics.js.map