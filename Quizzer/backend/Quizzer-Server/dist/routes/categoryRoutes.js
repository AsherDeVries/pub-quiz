'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _Category = require('../models/Category');

var _Category2 = _interopRequireDefault(_Category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var category = (0, _express.Router)();

  // perhaps expose some API metadata at the root
  category.get('/', function (req, res) {

    _Category2.default.find({}).then(function (data) {
      res.send(data);
    }).catch(function (err) {
      throw new Error('Can not retrieve categories from db');
    });
  });

  return category;
};
//# sourceMappingURL=categoryRoutes.js.map