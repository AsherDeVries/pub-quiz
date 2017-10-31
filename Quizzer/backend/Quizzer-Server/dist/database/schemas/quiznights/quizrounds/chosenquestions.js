'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var chosenquestionsSchema = new _mongoose.Schema({
  _id: String,
  hasBeenReviewed: Boolean
});

exports.default = chosenquestionsSchema;
//# sourceMappingURL=chosenquestions.js.map