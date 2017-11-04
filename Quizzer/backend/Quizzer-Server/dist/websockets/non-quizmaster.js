'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _Quiznight = require('../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _message_types = require('./constants/message_types');

var _message_types2 = _interopRequireDefault(_message_types);

var _server = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (quiznightCode) {
  var quiznightNamespace = _app2.default.webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', function (socket) {
    socket.emit(_message_types2.default.PENDING, 'Welcome to the quiznight with code: ' + socket.nsp.name + '! Send your teamname to join.');
    // TODO: refactor code below to redirect quizmaster to created namespace

    socket.on('CONNECT_QUIZMASTER', function (message) {
      socket.join('QUIZMASTER_ROOM');
      quiznightNamespace.to('QUIZMASTER_ROOM').emit('PENDING', 'Welcome to the quiznight quizmaster!, waiting for teams to apply..');
    });
    socket.emit('PENDING', 'Welcome to the quiznight! Send your teamname to join.');

    socket.on('CONNECT_SCOREBOARD', function (message) {
      socket.join('SCOREBOARD_ROOM');
    });

    socket.on(_message_types2.default.CONNECT_TEAM, function (message) {
      _Quiznight2.default.update({ _id: socket.nsp.name.substr(1) }, { $push: { teams: { _id: message.teamName, roundPoints: 0 } } }).then(function () {
        quiznightNamespace.to('QUIZMASTER_ROOM').emit('TEAM_JOINED', {
          'teamName': message.teamName,
          'socketId': socket.id
        });
        socket.join('TEAMS_ROOM');
      });
    });

    socket.on('START_ROUND', function (message) {
      _Quiznight2.default.find({ _id: socket.nsp.name.substr(1) }, { rounds: 1 }).then(function (result) {
        return _Quiznight2.default.update({ _id: socket.nsp.name.substr(1) }, { $push: { rounds: { _id: result.rounds.length + 1, teamStatistics: [], chosenQuestions: [] } } });
      }).then(function () {
        return _Quiznight2.default.find({ _id: socket.nsp.name.substr(1) }, { teams: 1 });
      }).then(function (result) {
        return result.teams;
      }).then(function (teams) {
        var promises = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = teams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var teamName = _step.value;

            promises.push(_Quiznight2.default.update({ _id: socket.nsp.name }, { $push: { "rounds.teamStatistics": { team: teamName, givenAnswers: [], correctAnswersAmount: 0 } } }));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return Promise.all(promises);
      }).then(function () {
        quiznightNamespace.to('TEAMS_ROOM').emit('PENDING', 'Round has started, waiting for next question.');
      });
    });

    socket.on('NEXT_QUESTION', function (message) {
      quiznightNamespace.to('TEAMS_ROOM').emit('NEW_QUESTION', { question: message.question });
    });

    socket.on('CLOSE_QUESTION', function (message) {
      quiznightNamespace.to('TEAMS_ROOM').emit('QUESTION_CLOSED', { question: message.question, answer: message.answer });
      // WANNEER MOET SCOREBOARD GEINFORMEERD WORDEN OVER ANTWOORDEN VAN TEAMS??
    });

    socket.on('SUBMIT_ANSWER', function (message) {
      _Quiznight2.default.update({ _id: message.teamName, rounds: { $elemMatch: { _id: message.round } }, "rounds.teamStatistics": { $elemMatch: { team: message.teamName } } }, { $set: { "rounds.0.teamStatistics.0.givenAnswers.$.value": message.answer } }).then(function () {
        quiznightNamespace.to('QUIZMASTER_ROOM').emit('ANSWER_SUBMITTED', { question: message.question, answer: message.answer, socketId: socket.id });
        quiznightNamespace.to('SCOREBOARD_ROOM').emit('ANSWER_SUBMITTED', { team: message.team });
        // Informeer scoreboard over submitted answer.
      });
    });

    socket.on('RE_SUBMIT_ANSWER', function (message) {
      var selector = "rounds.0.teamStatistics.0.givenAnswers." + message.round + ".value";
      _Quiznight2.default.update({ _id: message.teamName, rounds: { $elemMatch: { _id: message.round } }, "rounds.teamStatistics": { $elemMatch: { team: message.teamName } } }, { $set: { selector: message.answer } }).then(function () {
        quiznightNamespace.to('QUIZMASTER_ROOM').emit('ANSWER_SUBMITTED', { question: message.question, answer: message.answer, socketId: socket.id });
      });
    });

    socket.on('UPDATE_SCORE', function (message) {
      // Loop door lijst met teams
      // 1. Informeer over antwoord review
      // 2. Zet aantal goede antwoorden per team in db.
      // 3. Zet question op gereviewed in db
      quiznightNamespace.to(message.socket_id).emit('ANSWER_REVIEWED', { question: message.question, answer: message.answer });
      quiznightNamespace.to('QUIZMASTER_ROOM').emit('ANSWER_REVIEWED', { question: message.question, answer: message.answer });
    });

    socket.on('END_ROUND', function (message) {
      // Loop door lijst met teams
      // 1. update roundpoints in database
    });
  });

  return quiznightNamespace;
};
//# sourceMappingURL=non-quizmaster.js.map