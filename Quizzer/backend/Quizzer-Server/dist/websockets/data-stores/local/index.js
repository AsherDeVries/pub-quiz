'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _retriever = require('./retriever');

var _retriever2 = _interopRequireDefault(_retriever);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalDataStoreHandler = {
  addQuiznightToCache: function addQuiznightToCache(quiznightCode) {
    _store2.default.data.quizNights.push({
      quiznightCode: quiznightCode,
      state: {
        teams: [],
        rounds: []
      },
      connections: {
        teams: []
      }
    });
  },
  addChosenQuestionsToRound: function addChosenQuestionsToRound(quiznightCode, chosenQuestions) {
    var round = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode);
    round.chosenQuestions = chosenQuestions;
  },
  addTeamConnectionToCache: function addTeamConnectionToCache(quiznightCode, teamName, socket) {
    var quiznight = _retriever2.default.getQuiznightByCode(quiznightCode);
    quiznight.connections.teams.push({
      teamName: teamName,
      socketId: socket.id
    });
  },
  saveNewQuiznightRoundToCache: function saveNewQuiznightRoundToCache(quiznightCode) {
    var quiznight = _retriever2.default.getQuiznightByCode(quiznightCode);
    var newRoundNumber = quiznight.state.rounds.length + 1;

    var newTeamStatistics = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = quiznight.state.teams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var team = _step.value;

        newTeamStatistics.push({
          team: team._id,
          givenAnswers: [],
          correctAnswersAmount: 0
        });
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

    quiznight.state.rounds.push({
      _id: newRoundNumber,
      teamStatistics: newTeamStatistics
    });
  },
  removeTeamInQuiznightFromCache: function removeTeamInQuiznightFromCache(quiznightCode, teamName) {
    var quiznight = _retriever2.default.getQuiznightByCode(quiznightCode);
    var team = _retriever2.default.getTeamOfQuiznightByName(quiznightCode, teamName);

    var index = quiznight.state.teams.indexOf(team);
    var teamConnections = quiznight.connections.teams;
    // remove connection
    for (var i = 0; i < teamConnections.length; i++) {
      if (teamConnections[i].teamName == teamName) {
        teamConnections.splice(i, 1);
      }
    }
    // remove team data
    quiznight.state.teams.splice(index, 1);
  },
  saveNewTeamInQuiznightToCache: function saveNewTeamInQuiznightToCache(quiznightCode, teamName) {
    var quiznight = _retriever2.default.getQuiznightByCode(quiznightCode);
    quiznight.state.teams.push({
      _id: teamName,
      roundPoints: 0
    });
  },
  getSocketIdFromTeam: function getSocketIdFromTeam(quiznightCode, teamName) {
    var quiznight = _retriever2.default.getQuiznightByCode(quiznightCode);
    var team = quiznight.connections.teams.find(function (object) {
      return object.teamName == teamName;
    });
    return team.socketId;
  },
  incrementCorrectAnswersOfTeam: function incrementCorrectAnswersOfTeam(quiznightCode, round, teamName) {
    var teamStatistics = _retriever2.default.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName);
    teamStatistics.correctAnswersAmount++;
  },
  saveAnswerOfTeamInRoundToCache: function saveAnswerOfTeamInRoundToCache(quiznightCode, round, teamName, question, answer) {
    var teamStatistics = _retriever2.default.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName);
    if (this.teamHasGivenAnswerForQuestion(teamStatistics, question)) {
      var givenAnswer = _retriever2.default.getGivenAnswerToQuestion(teamStatistics, question);
      givenAnswer.value = answer;
    } else {
      teamStatistics.givenAnswers.push({
        question: question,
        value: answer
      });
    }
  },
  teamHasGivenAnswerForQuestion: function teamHasGivenAnswerForQuestion(teamStatistics, question) {
    return _retriever2.default.getGivenAnswerToQuestion(teamStatistics, question) != null;
  },
  updateRoundPointsOfAllTeams: function updateRoundPointsOfAllTeams(quiznightCode) {
    var quiznightRound = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode);
    var topListTeams = quiznightRound.teamStatistics.sort(function (a, b) {
      return b.correctAnswersAmount - a.correctAnswersAmount;
    });

    for (var i = 0; i < topListTeams.length; i++) {
      var team = _retriever2.default.getTeamOfQuiznightByName(quiznightCode, topListTeams[i].team);
      if (i == 0) {
        team.roundPoints = 4;
      } else if (i == 1) {
        team.roundPoints = 2;
      } else if (i == 2) {
        team.roundPoints = 1;
      } else {
        team.roundPoints = 0.1;
      }
    }
    var teams = _retriever2.default.getTeamsOfQuiznight(quiznightCode);
  },
  updateQuestionToReviewed: function updateQuestionToReviewed(quiznightCode, question) {
    var round = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode);
    var questionToUpdate = round.chosenQuestions.find(function (q) {
      return q._id == question;
    });
    questionToUpdate.hasBeenReviewed = true;
  },
  removeQuiznightByCode: function removeQuiznightByCode(quiznightCode) {
    var quiznights = _retriever2.default.getAllQuiznights(quiznightCode);
    for (var i = 0; i < quiznights.length; i++) {
      if (quiznights[i].quiznight == quiznightCode) {
        quiznights.splice(i, 1);
      }
    }
  }
};

exports.default = LocalDataStoreHandler;
//# sourceMappingURL=index.js.map