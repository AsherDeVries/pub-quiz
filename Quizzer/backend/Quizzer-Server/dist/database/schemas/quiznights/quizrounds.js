'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _teamstatistics = require('./quizrounds/teamstatistics');

var _teamstatistics2 = _interopRequireDefault(_teamstatistics);

var _chosenquestions = require('./quizrounds/chosenquestions');

var _chosenquestions2 = _interopRequireDefault(_chosenquestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quiznightRoundSchema = new _mongoose.Schema({
  _id: Number,
  teamStatistics: [_teamstatistics2.default],
  chosenQuestions: [_chosenquestions2.default]
});

exports.default = quiznightRoundSchema;
//# sourceMappingURL=quizrounds.js.map