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
  var quiznightRoute = (0, _express.Router)();

  quiznightRoute.post('/:quiznightId/rounds', function (req, res) {
    if (req.params.quiznightId) {

      req.body.forEach(function (element) {
        element.hasBeenReviewed = false;
      });

      _Quiznight2.default.update({ _id: req.params.quiznightId }, {
        $push: {
          rounds: {
            chosenQuestions: req.body
          }
        }
      }).then(function (data) {
        return res.send("saved");
      });
    }
  });

  quiznightRoute.get('/', function (req, res) {
    _Quiznight2.default.find({}).then(function (data) {
      return res.send(data);
    });
  });

  return quiznightRoute;
};
//# sourceMappingURL=quiznightRoutes.js.map