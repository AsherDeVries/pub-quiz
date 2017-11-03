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

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _nonQuizmaster = require('../websockets/non-quizmaster');

var _nonQuizmaster2 = _interopRequireDefault(_nonQuizmaster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var quiznightRoute = (0, _express.Router)();

  quiznightRoute.post('/', function (req, res) {

    var quiznightCode = _randomstring2.default.generate({
      length: 6,
      charset: 'alphanumeric'
    });

    var qn = new _Quiznight2.default({
      _id: quiznightCode,
      teams: [],
      rounds: []
    });

    (0, _nonQuizmaster2.default)(quiznightCode);
    qn.save().then(function () {
      return res.send({ code: quiznightCode });
    });
    // generate string
    // create namespace
    // on success:
    //  save to db
    // respond with code
  });

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