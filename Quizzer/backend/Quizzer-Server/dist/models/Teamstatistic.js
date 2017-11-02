'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _teamstatistics = require('../database/schemas/quiznights/quizrounds/teamstatistics');

var _teamstatistics2 = _interopRequireDefault(_teamstatistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.model('Teamstatistic', _teamstatistics2.default);
//# sourceMappingURL=Teamstatistic.js.map