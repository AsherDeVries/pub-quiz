'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var questionsSchema = new _mongoose.Schema({
  _id: String,
  correctAnswer: String,
  category: {
    type: String,
    ref: 'Category'
  }
});

exports.default = questionsSchema;
//# sourceMappingURL=questions.js.map