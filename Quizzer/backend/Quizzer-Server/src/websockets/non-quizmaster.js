import app from '../app';
import Quiznight from '../models/Quiznight';
import MESSAGE_TYPES from './constants/message_types';
import { isQuizmaster } from './server';

export default (quiznightCode) => {
  let quiznightNamespace = app.webSocketServer.of('/' + quiznightCode);

  quiznightNamespace.on('connection', (socket) => {
    socket.emit(MESSAGE_TYPES.PENDING, `Welcome to the quiznight with code: ${socket.nsp.name}! Send your teamname to join.`);
    // TODO: refactor code below to redirect quizmaster to created namespace
    
    socket.on('CONNECT_QUIZMASTER', (message) => {
      socket.join('QUIZMASTER_ROOM');
      quiznightNamespace.to('QUIZMASTER_ROOM').emit('PENDING', `Welcome to the quiznight quizmaster!, waiting for teams to apply..`);
    });
    socket.emit('PENDING', `Welcome to the quiznight! Send your teamname to join.`);
    
    socket.on('CONNECT_SCOREBOARD', (message) => {
      socket.join('SCOREBOARD_ROOM');
    });

    socket.on(MESSAGE_TYPES.CONNECT_TEAM, (message) => {
      Quiznight.update(
        { _id: socket.nsp.name.substr(1) },
        { $push: { teams: { _id: message.teamName, roundPoints: 0 } } })
        .then(() => {
          quiznightNamespace.to('QUIZMASTER_ROOM').emit('TEAM_JOINED', {
            'teamName': message.teamName,
            'socketId': socket.id
          });
          socket.join('TEAMS_ROOM');
        });
    });

    socket.on('START_ROUND', (message) => {
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
          quiznightNamespace.to('TEAMS_ROOM').emit('PENDING', 'Round has started, waiting for next question.')
        });
    });

    socket.on('NEXT_QUESTION', (message) => {
      quiznightNamespace.to('TEAMS_ROOM').emit('NEW_QUESTION', { question: message.question })
    });

    socket.on('CLOSE_QUESTION', (message) => {
      quiznightNamespace.to('TEAMS_ROOM').emit('QUESTION_CLOSED', { question: message.question, answer: message.answer })
      // WANNEER MOET SCOREBOARD GEINFORMEERD WORDEN OVER ANTWOORDEN VAN TEAMS??
    });

    socket.on('SUBMIT_ANSWER', (message) => {
      Quiznight.update(
        { _id: message.teamName, rounds: { $elemMatch: { _id: message.round } },  "rounds.teamStatistics" : { $elemMatch: { team: message.teamName } } },
        { $set: { "rounds.0.teamStatistics.0.givenAnswers.$.value": message.answer } })
        .then(() => {
          quiznightNamespace.to('QUIZMASTER_ROOM')
            .emit('ANSWER_SUBMITTED', { question: message.question, answer: message.answer, socketId: socket.id })
          quiznightNamespace.to('SCOREBOARD_ROOM')
            .emit('ANSWER_SUBMITTED', { team: message.team })
          // Informeer scoreboard over submitted answer.
        });
    });

    socket.on('RE_SUBMIT_ANSWER', (message) => {
      let selector = "rounds.0.teamStatistics.0.givenAnswers." + message.round + ".value";
      Quiznight.update(
        { _id: message.teamName, rounds: { $elemMatch: { _id: message.round } },  "rounds.teamStatistics" : { $elemMatch: { team: message.teamName } } },
        { $set: { selector: message.answer } })
        .then(() => {
          quiznightNamespace.to('QUIZMASTER_ROOM')
            .emit('ANSWER_SUBMITTED', { question: message.question, answer: message.answer, socketId: socket.id })
        });
    });

    socket.on('UPDATE_SCORE', (message) => {
      // Loop door lijst met teams
      // 1. Informeer over antwoord review
      // 2. Zet aantal goede antwoorden per team in db.
      // 3. Zet question op gereviewed in db
      quiznightNamespace.to(message.socket_id).emit('ANSWER_REVIEWED', { question: message.question, answer: message.answer })
      quiznightNamespace.to('QUIZMASTER_ROOM').emit('ANSWER_REVIEWED', { question: message.question, answer: message.answer })
    });

    socket.on('END_ROUND', (message) => {
      // Loop door lijst met teams
      // 1. update roundpoints in database
    });
  });

  return quiznightNamespace;
}