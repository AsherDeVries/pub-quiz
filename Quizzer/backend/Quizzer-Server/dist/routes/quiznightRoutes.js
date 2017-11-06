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

var _websockets = require('../websockets');

var _local = require('../websockets/data-stores/local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    _local2.default.addQuiznightToCache(quiznightCode);

    (0, _websockets.createWebsocketNamespaceForQuiznight)(quiznightCode);
    qn.save().then(function () {
      return res.send({ code: quiznightCode });
    });
  });

  quiznightRoute.post('/:quiznightId/rounds/:roundId', function (req, res) {
    if (req.params.quiznightId && req.params.roundId) {

      req.body.forEach(function (element) {
        element.hasBeenReviewed = false;
      });

      _Quiznight2.default.findOne({ _id: req.params.quiznightId }).then(function (data) {

        var newRounds = [].concat(_toConsumableArray(data.rounds));
        newRounds[parseInt(req.params.roundId) - 1].chosenQuestions = req.body;

        _local2.default.addChosenQuestionsToRound(req.params.quiznightId, req.body);

        _Quiznight2.default.update({ _id: req.params.quiznightId }, {
          $set: {
            rounds: newRounds
          }
        }).then(function (data) {
          return res.send("saved");
        }).catch(function (err) {
          throw new Error('Can not save questions');
        });
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