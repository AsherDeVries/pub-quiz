'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quiznightSchema = new _mongoose2.default.Schema({
  _id: String,
  teams: [{
    _id: String,
    roundPoints: Number
  }],
  rounds: [{
    _id: Number,
    teamStatistics: [{
      team: {
        type: String,
        required: true
      },
      givenAnswers: [{
        value: {
          type: String,
          minlength: 1
        }
      }],
      correctAnswersAmount: Number
    }],
    chosenQuestions: [{
      _id: {
        type: String,
        ref: 'Question'
      },
      hasBeenReviewed: {
        type: Boolean,
        required: true
      }
    }]
  }]
});

exports.default = _mongoose2.default.model('Quiznight', quiznightSchema);
//# sourceMappingURL=Quiznight.js.map