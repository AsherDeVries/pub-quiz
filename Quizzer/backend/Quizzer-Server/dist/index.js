'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.httpServer = _http2.default.createServer(_app2.default);

// Listen for http requests
_app2.default.httpServer.listen(process.env.PORT || _config2.default.port, function () {
	console.log('Started on port ' + _app2.default.httpServer.address().port);
});
//# sourceMappingURL=index.js.map