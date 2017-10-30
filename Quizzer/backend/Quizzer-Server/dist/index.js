'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.server = _http2.default.createServer(_app2.default);

_app2.default.server.listen(process.env.PORT || _config2.default.port, function () {
	console.log('Started on port ' + _app2.default.server.address().port);
});
//# sourceMappingURL=index.js.map