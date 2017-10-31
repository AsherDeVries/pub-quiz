'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionsPerRoundSchema = new Schema({
  _id: String,
  correctAnswer: String,
  category: [_categories2.default]
});

exports.default = questionsPerRoundSchema;
//# sourceMappingURL=questions.js.map