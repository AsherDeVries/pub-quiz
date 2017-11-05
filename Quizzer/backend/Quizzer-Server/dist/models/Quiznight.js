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
      _id: {
        auto: false
      },
      team: {
        type: String,
        required: true
      },
      givenAnswers: [{
        _id: {
          auto: false
        },
        question: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
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