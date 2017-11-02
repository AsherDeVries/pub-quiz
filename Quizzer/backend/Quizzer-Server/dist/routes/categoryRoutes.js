'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

exports.default = function () {
	var category = (0, _express.Router)();

	// perhaps expose some API metadata at the root
	api.get('/categories', function (req, res) {
		res.send({ api_version: _package.version });
	});

	return category;
};
//# sourceMappingURL=categoryRoutes.js.map