'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _quiznights = require('../database/schemas/quiznights');

var _quiznights2 = _interopRequireDefault(_quiznights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.model('Quiznight', _quiznights2.default);
//# sourceMappingURL=Quiznight.js.map