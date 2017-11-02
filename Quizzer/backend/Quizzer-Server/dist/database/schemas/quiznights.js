'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _teams = require('./quiznights/teams');

var _teams2 = _interopRequireDefault(_teams);

var _quizrounds = require('./quiznights/quizrounds');

var _quizrounds2 = _interopRequireDefault(_quizrounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quiznightSchema = new _mongoose.Schema({
  _id: String,
  teams: [_teams2.default],
  rounds: [_quizrounds2.default]
});

exports.default = quiznightSchema;
//# sourceMappingURL=quiznights.js.map