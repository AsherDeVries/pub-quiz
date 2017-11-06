'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionSchema = new _mongoose2.default.Schema({
  _id: String,
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    ref: 'Category'
  }
});

exports.default = _mongoose2.default.model('Question', questionSchema);
//# sourceMappingURL=Question.js.map