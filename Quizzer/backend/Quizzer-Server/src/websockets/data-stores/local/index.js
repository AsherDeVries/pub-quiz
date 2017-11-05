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
    console.log('-- IN addQuiznightToCache --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
  },
  addTeamConnectionToCache(quiznightCode, teamName, socket) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    quiznight.connections.teams.push({
      teamName: teamName,
      socketId: socket.id
    });
    console.log('-- IN addTeamToCache --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
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
    console.log('-- IN saveNewQuiznightRoundToCache --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
  },
  removeTeamInQuiznightFromCache(quiznightCode, teamName) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    let team = LocalDataStoreRetriever.getTeamOfQuiznightByName(quiznightCode, teamName);
    quiznight.state.teams.remove(team);
    console.log('-- IN removeTeamInQuiznightFromCache --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
  },
  saveNewTeamInQuiznightToCache(quiznightCode, teamName) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    quiznight.state.teams.push({
      _id: teamName,
      roundPoints: 0
    });
    console.log('-- IN saveNewTeamInQuiznightToCache --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
  },
  getSocketIdFromTeam(quiznightCode, teamName) {
    let quiznight = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);
    let team = quiznight.connections.teams.find((object) => {
      return object.teamName == teamName;
    });
    console.log('-- IN getSocketIdFromTeam --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
    return team.socketId;
  },
  incrementCorrectAnswersOfTeam(quiznightCode, round, teamName) {
    let teamStatistics = LocalDataStoreRetriever.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName);
    teamStatistics.correctAnswersAmount++;
    console.log('-- IN incrementCorrectAnswersOfTeam --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
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
    console.log('-- IN saveAnswerOfTeamInRoundToCache --');
    console.log(JSON.stringify(LocalDataStore.data.quizNights));
  },
  teamHasGivenAnswerForQuestion(teamStatistics, question) {
    return LocalDataStoreRetriever.getGivenAnswerToQuestion(teamStatistics, question) != null;
  },
};

export default LocalDataStoreHandler;