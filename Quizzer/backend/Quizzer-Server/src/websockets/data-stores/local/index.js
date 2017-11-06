import LocalDataStoreRetriever from './retriever';
import LocalDataStore from './store';

const LocalDataStoreHandler = {
  addQuiznightToCache(quiznightCode) {
    LocalDataStore.data.quizNights.push({
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
  addChosenQuestionsToRound(quiznightCode, chosenQuestions) {
    let round = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode);
    round.chosenQuestions = chosenQuestions;
  },
  addTeamConnectionToCache(quiznightCode, teamName, socket) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    quiznight.connections.teams.push({
      teamName: teamName,
      socketId: socket.id
    });
  },
  saveNewQuiznightRoundToCache(quiznightCode) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    let newRoundNumber = quiznight.state.rounds.length+1;

    let newTeamStatistics = [];
    for(let team of quiznight.state.teams) {
      newTeamStatistics.push({
        team: team._id,
        givenAnswers: [],
        correctAnswersAmount: 0
      })
    }

    quiznight.state.rounds.push({
      _id: newRoundNumber,
      teamStatistics: newTeamStatistics
    });
  },
  removeTeamInQuiznightFromCache(quiznightCode, teamName) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    let team = LocalDataStoreRetriever.getTeamOfQuiznightByName(quiznightCode, teamName);

    var index = quiznight.state.teams.indexOf(team);
    let teamConnections = quiznight.connections.teams;
    // remove connection
    for(let i = 0; i < teamConnections.length; i++) {
      if(teamConnections[i].teamName == teamName) {
        teamConnections.splice(i, 1);
      }
    }
    // remove team data
    quiznight.state.teams.splice(index, 1);
  },
  saveNewTeamInQuiznightToCache(quiznightCode, teamName) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    quiznight.state.teams.push({
      _id: teamName,
      roundPoints: 0
    });
  },
  getSocketIdFromTeam(quiznightCode, teamName) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    let team = quiznight.connections.teams.find((object) => {
      return object.teamName == teamName;
    });
    return team.socketId;
  },
  incrementCorrectAnswersOfTeam(quiznightCode, round, teamName) {
    let teamStatistics = LocalDataStoreRetriever.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName);
    teamStatistics.correctAnswersAmount++;
  },
  saveAnswerOfTeamInRoundToCache(quiznightCode, round, teamName, question, answer) {
    let teamStatistics = LocalDataStoreRetriever.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName);
    if(this.teamHasGivenAnswerForQuestion(teamStatistics, question)) {
      let givenAnswer = LocalDataStoreRetriever.getGivenAnswerToQuestion(teamStatistics, question);
      givenAnswer.value = answer;
    } else {
      teamStatistics.givenAnswers.push({
        question: question,
        value: answer
      });
    }
  },
  teamHasGivenAnswerForQuestion(teamStatistics, question) {
    return LocalDataStoreRetriever.getGivenAnswerToQuestion(teamStatistics, question) != null;
  },
  updateRoundPointsOfAllTeams(quiznightCode) {
    let quiznightRound = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode);
    let topListTeams = quiznightRound.teamStatistics.sort((a, b) => {
      return b.correctAnswersAmount - a.correctAnswersAmount;
    })

    for(let i = 0; i < topListTeams.length; i++) {
      let team = LocalDataStoreRetriever.getTeamOfQuiznightByName(quiznightCode, topListTeams[i].team);
      if(i == 0) {
        team.roundPoints = 4;
      }
      else if(i == 1) {
        team.roundPoints = 2;
      }
      else if(i == 2) {
        team.roundPoints = 1;
      } else {
        team.roundPoints = 0.1;
      }
    }
    let teams = LocalDataStoreRetriever.getTeamsOfQuiznight(quiznightCode);
  },
  updateQuestionToReviewed(quiznightCode, question) {
    let round = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode);
    let questionToUpdate = round.chosenQuestions.find((q) => {
      return q._id == question;
    })
    questionToUpdate.hasBeenReviewed = true;
  },
  removeQuiznightByCode(quiznightCode) {
    let quiznights = LocalDataStoreRetriever.getAllQuiznights(quiznightCode);
    for(let i = 0; i < quiznights.length; i++) {
      if(quiznights[i].quiznight == quiznightCode) {
        quiznights.splice(i, 1);
      }
    }
  }
};

export default LocalDataStoreHandler;