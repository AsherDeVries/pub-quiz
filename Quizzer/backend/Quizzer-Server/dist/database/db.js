'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config.json');

var _categories = require('../assets/categories');

var _categories2 = _interopRequireDefault(_categories);

var _Question = require('../models/Question');

var _Question2 = _interopRequireDefault(_Question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var db = void 0;
  _mongoose2.default.connect('mongodb://localhost:' + _config.db_port + '/' + _config.db_name, { useMongoClient: true }, function (err, result) {
    db = result;
    _Question2.default.populate(_categories2.default);
  });
};
//# sourceMappingURL=db.js.map