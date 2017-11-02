'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _server = require('./websockets/server');

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _websockets = require('./websockets');

var _websockets2 = _interopRequireDefault(_websockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.httpServer = _http2.default.createServer(_app2.default);
_app2.default.webSocketServer = (0, _server.createWebsocketServer)();

(0, _websockets2.default)(_config2.default, _app2.default.httpServer);

// Listen for http requests
_app2.default.httpServer.listen(process.env.PORT || _config2.default.port, function () {
	console.log('Started on port ' + _app2.default.httpServer.address().port);
});
//# sourceMappingURL=index.js.map