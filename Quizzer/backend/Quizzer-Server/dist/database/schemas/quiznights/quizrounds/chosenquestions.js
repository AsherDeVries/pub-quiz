'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _questions = require('../../questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chosenquestionsSchema = new _mongoose.Schema({
  _id: {
    type: String,
    ref: 'Question'
  },
  hasBeenReviewed: Boolean
});

exports.default = chosenquestionsSchema;
//# sourceMappingURL=chosenquestions.js.map