'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

exports.default = function (_ref) {
	var config = _ref.config;

	var api = (0, _express.Router)();

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.send({ api_version: _package.version });
	});

	return api;
};
//# sourceMappingURL=index.js.map