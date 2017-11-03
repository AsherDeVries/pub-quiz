import app from '../app';
import Quiznight from '../models/Quiznight';
import MESSAGE_TYPES from './constants/message_types';
import ROOM_NAMES from './constants/rooms';

export default (quiznightCode) => {
  let quiznightNamespace = app.webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', (socket) => {
    socket.on(MESSAGE_TYPES.CONNECT_QUIZMASTER, (message) => {
      socket.join(ROOM_NAMES.QUIZMASTER);
      quiznightNamespace.to(ROOM_NAMES.QUIZMASTER).emit('PENDING', `Welcome to the quiznight quizmaster!, waiting for teams to apply..`);
    });
    
    socket.on(MESSAGE_TYPES.CONNECT_SCOREBOARD, (message) => {
      socket.join(ROOM_NAMES.SCOREBOARD);
    });

    socket.on(MESSAGE_TYPES.CONNECT_TEAM, (message) => {
      Quiznight.update(
        { _id: socket.nsp.name.substr(1) },
        { $push: { teams: { _id: message.teamName, roundPoints: 0 } } })
        .then(() => {
          quiznightNamespace.to(ROOM_NAMES.QUIZMASTER).emit(MESSAGE_TYPES.TEAM_JOINED, {
            teamName: message.teamName,
            socketId: socket.id
          });
          socket.join();
        });
    });

    socket.on(MESSAGE_TYPES.START_ROUND, (message) => {
      Quiznight
        .find({ _id: socket.nsp.name.substr(1) }, { rounds: 1 })
        .then((result) => {
          return Quiznight
            .update(
              { _id: socket.nsp.name.substr(1) },
              { $push: { rounds: { _id: result.rounds.length+1, teamStatistics: [], chosenQuestions: [] } } })
        })
        .then(() => {
          return Quiznight
            .find({ _id: socket.nsp.name.substr(1) }, { teams: 1 })
        })
        .then((result) => {
          return result.teams;
        })
        .then((teams) => {
          let promises = [];
          for(let teamName of teams) {
            promises.push(
              Quiznight
                .update(
                  { _id: socket.nsp.name },
                  { $push: { "rounds.teamStatistics": { team: teamName, givenAnswers: [], correctAnswersAmount: 0 } } })
            );
          }
          return Promise.all(promises);
        })
        .then(() => {
          quiznightNamespace.to(ROOM_NAMES.TEAMS).emit(MESSAGE_TYPES.PENDING, 'Round has started, waiting for next question.')
        });
    });

    socket.on(MESSAGE_TYPES.NEXT_QUESTION, (message) => {
      quiznightNamespace.to(ROOM_NAMES.TEAMS).emit(MESSAGE_TYPES.NEW_QUESTION, { question: message.question })
    });

    socket.on(MESSAGE_TYPES.CLOSE_QUESTION, (message) => {
      quiznightNamespace.to(ROOM_NAMES.TEAMS).emit(MESSAGE_TYPES.QUESTION_CLOSED, { question: message.question, answer: message.answer })
      // WANNEER MOET SCOREBOARD GEINFORMEERD WORDEN OVER ANTWOORDEN VAN TEAMS??
    });

    socket.on(MESSAGE_TYPES.SUBMIT_ANSWER, (message) => {
      Quiznight.update(
        { _id: message.teamName, rounds: { $elemMatch: { _id: message.round } },  "rounds.teamStatistics" : { $elemMatch: { team: message.teamName } } },
        { $set: { "rounds.0.teamStatistics.0.givenAnswers.$.value": message.answer } })
        .then(() => {
          quiznightNamespace.to(ROOM_NAMES.QUIZMASTER)
            .emit(MESSAGE_TYPES.ANSWER_SUBMITTED, { question: message.question, answer: message.answer, socketId: socket.id })
          quiznightNamespace.to(ROOM_NAMES.SCOREBOARD)
            .emit(MESSAGE_TYPES.ANSWER_SUBMITTED, { team: message.team })
          // Informeer scoreboard over submitted answer.
        });
    });

    socket.on(MESSAGE_TYPES.RE_SUBMIT_ANSWER, (message) => {
      let selector = "rounds.0.teamStatistics.0.givenAnswers." + message.round + ".value";
      Quiznight.update(
        { _id: message.teamName, rounds: { $elemMatch: { _id: message.round } },  "rounds.teamStatistics" : { $elemMatch: { team: message.teamName } } },
        { $set: { selector: message.answer } })
        .then(() => {
          quiznightNamespace.to(ROOM_NAMES.QUIZMASTER)
            .emit(MESSAGE_TYPES.ANSWER_SUBMITTED, { question: message.question, answer: message.answer, socketId: socket.id })
        });
    });

    socket.on(MESSAGE_TYPES.UPDATE_SCORE, (message) => {
      // Loop door lijst met teams
      // 1. Informeer over antwoord review
      // 2. Zet aantal goede antwoorden per team in db.
      // 3. Zet question op gereviewed in db
      quiznightNamespace.to(message.socket_id).emit(MESSAGE_TYPES.ANSWER_REVIEWED, { question: message.question, answer: message.answer })
      quiznightNamespace.to(ROOM_NAMES.QUIZMASTER).emit(MESSAGE_TYPES.ANSWER_REVIEWED, { question: message.question, answer: message.answer })
    });

    socket.on(MESSAGE_TYPES.END_ROUND, (message) => {
      // Loop door lijst met teams
      // 1. update roundpoints in database
    });

    socket.on(MESSAGE_TYPES.END_GAME, (message) => {
      // Loop door lijst met teams
      // 1. update roundpoints in database
    });
  });

  return quiznightNamespace;
}