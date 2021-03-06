'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

exports.default = function () {
	var api = (0, _express.Router)();

	api.get('/', function (req, res) {
		res.send({ api_version: _package.version });
	});

	return api;
};
//# sourceMappingURL=index.js.map