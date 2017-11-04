'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config.json');

var _seedScript = require('./seed-script');

var _seedScript2 = _interopRequireDefault(_seedScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _mongoose2.default.Promise = global.Promise;
  var options = { useMongoClient: true, promiseLibrary: global.Promise };
  _mongoose2.default.connect('mongodb://localhost:' + _config.db_port + '/' + _config.db_name, options, function (err, db) {
    if (db) {
      (0, _seedScript2.default)();
    }
  });
};
//# sourceMappingURL=db.js.map