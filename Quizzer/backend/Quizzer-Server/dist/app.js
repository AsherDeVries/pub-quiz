'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _categoryRoutes = require('./routes/categoryRoutes');

var _categoryRoutes2 = _interopRequireDefault(_categoryRoutes);

var _questionRoutes = require('./routes/questionRoutes');

var _questionRoutes2 = _interopRequireDefault(_questionRoutes);

var _quiznightRoutes = require('./routes/quiznightRoutes');

var _quiznightRoutes2 = _interopRequireDefault(_quiznightRoutes);

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

var _errorHandling = require('./middleware/error-handling');

var _errorHandling2 = _interopRequireDefault(_errorHandling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

(0, _db2.default)();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((0, _middleware2.default)());

//setup endpoints
app.use('/categories', (0, _categoryRoutes2.default)());
app.use('/questions', (0, _questionRoutes2.default)());
app.use('/quiznights', (0, _quiznightRoutes2.default)());

app.use(_errorHandling2.default);

exports.default = app;
//# sourceMappingURL=app.js.map