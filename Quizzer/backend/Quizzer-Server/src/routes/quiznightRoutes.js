import { version } from '../../package.json';
import { Router } from 'express';

import QuestionModel from '../models/Question';
import Quiznight from '../models/Quiznight';
import randomstring from 'randomstring';
import { createWebsocketNamespaceForQuiznight } from '../websockets';
import LocalDataStoreHandler from '../websockets/data-stores/local';

export default () => {
  let quiznightRoute = Router();

  quiznightRoute.post('/', (req, res) => {

     let quiznightCode = randomstring.generate({
       length: 6,
       charset: 'alphanumeric'
     });

     let qn = new Quiznight({
       _id: quiznightCode,
       teams: [],
       rounds: []
     });
 
     LocalDataStoreHandler
      .addQuiznightToCache(quiznightCode);

    createWebsocketNamespaceForQuiznight(quiznightCode);
    qn.save()
      .then(() => {
        return res.send({ code: quiznightCode })
      });
  });

  quiznightRoute.post('/:quiznightId/rounds/:roundId', (req, res) => {
    if (req.params.quiznightId && req.params.roundId) {

      req.body.forEach(element => {
        element.hasBeenReviewed = false;
      });

      Quiznight.findOne({ _id: req.params.quiznightId }).then(data => {
       
        const newRounds = [...data.rounds];
        newRounds[parseInt(req.params.roundId) -1].chosenQuestions = req.body

        LocalDataStoreHandler
          .addChosenQuestionsToRound(req.params.quiznightId, req.body);

        Quiznight.update(
          { _id: req.params.quiznightId},
          {
            $set: {
              rounds: newRounds
            }
          }
        ).then(data => res.send("saved")).catch(err => {throw new Error('Can not save questions')})
      });
    }
  });

  quiznightRoute.get('/', (req, res) => {
    Quiznight.find({}).then(data => {
      return res.send(data);
    })
  })

  return quiznightRoute;
}
