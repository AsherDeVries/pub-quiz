'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _Question = require('../models/Question');

var _Question2 = _interopRequireDefault(_Question);

var _Quiznight = require('../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var question = (0, _express.Router)();

  question.get('/', middlewareForQueryPresent, function (req, res) {
    _Question2.default.find({}).then(function (data) {
      return res.send(data);
    }).catch(function (err) {
      throw new Error('Can not retrieve questions from db');
    });
  });

  return question;
};

var middlewareForQueryPresent = function middlewareForQueryPresent(req, res, next) {
  if (req.query.category) {
    if (req.query.random) {
      var limitrecords = req.query.limit ? parseInt(req.query.limit) : 50;
      _Question2.default.count({ 'category': req.query.category }, function (err, count) {
        var skipRecords = getRandom(1, count - limitrecords);
        _Question2.default.find({ 'category': req.query.category }).skip(skipRecords).limit(limitrecords).then(function (data) {
          return res.send(data);
        });
      });
    } else {
      _Question2.default.find({ 'category': req.query.category }).then(function (data) {
        return res.send(data);
      }).catch(function (err) {
        throw new Error('Can not retrieve questions from db');
      });
    }
  } else {
    return next();
  }
};

var getRandom = function getRandom(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};
//# sourceMappingURL=questionRoutes.js.map