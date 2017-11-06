import MESSAGE_TYPES from '../../constants/message_types';
import ROOM_NAMES from '../../constants/rooms';
import LocalDataStoreRetriever from '../../data-stores/local/retriever';

const ScoreboardMessageSender = {
  toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessage(messageType, message) {
    this.socket.emit(messageType, message);
  },
  sendMessageToAllScoreboards(messageType, message) {
    this.namespace.to(ROOM_NAMES.SCOREBOARD).emit(messageType, message);
  },
  sendNewQuestionMessage(quiznightCode, question, category) {
    let quiznightRound = {...LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode)};
    let teamsDataToSend = [];
    for(let teamStat of quiznightRound.teamStatistics) {
      let givenAnswerOfTeam = LocalDataStoreRetriever.getGivenAnswerToQuestion(teamStat, question);

      teamsDataToSend.push({
        teamName: teamStat.team,
        givenAnswer: givenAnswerOfTeam
      });
    }

    let answersPerTeam = teamsDataToSend;
    for(let answerOfTeam of answersPerTeam) {
      answerOfTeam.hasAnswered = false;
    }
    this.sendMessageToAllScoreboards(MESSAGE_TYPES.NEW_QUESTION, {
      question: { question: question, category: category },
      teams: answersPerTeam
    });
  },
  sendShowQuestionResultsMessage(quiznightCode, question, category) {
    this.sendMessageToAllScoreboards(MESSAGE_TYPES.SHOW_QUESTION_RESULTS, {
      question: { question: question, category: category },
      teams: LocalDataStoreRetriever.getGivenAnswersOfQuestionPerTeam(quiznightCode, question)
    });
  },
  sendShowScoresMessage(quiznightCode) {
    let data = LocalDataStoreRetriever.getQuiznightByCode(quiznightCode);

    let qn = {...data};
    let teams = qn.state.teams;
    let quizRound = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode);

    for(let team of teams) {
      let teamStats = LocalDataStoreRetriever.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, team._id);
      team.score = {
        round: quizRound._id,
        questionsCorrect: teamStats.correctAnswersAmount
      }
    }

    console.log("SHOW SCORES");
    console.log(teams);
    this.sendMessageToAllScoreboards(MESSAGE_TYPES.SHOW_SCORES, {
      teams: teams
    });
  }
};

export default ScoreboardMessageSender;