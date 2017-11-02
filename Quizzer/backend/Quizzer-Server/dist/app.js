'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./database/db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

(0, _db2.default)();

// internal middleware
app.use((0, _middleware2.default)({ config: _config2.default }));

// api router
app.use('/', (0, _routes2.default)({ config: _config2.default }));

exports.default = app;
//# sourceMappingURL=app.js.map