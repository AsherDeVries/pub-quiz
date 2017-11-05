import { version } from '../../package.json';
import { Router } from 'express';

import QuestionModel from '../models/Question';
import Quiznight from '../models/Quiznight';
import randomstring from 'randomstring';
import { createWebsocketNamespaceForQuiznight } from '../websockets';
import TeamWebsocketConnectionsCacheHandler from '../websockets/caching/connections';

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

     TeamWebsocketConnectionsCacheHandler
      .addQuiznightToCache(quiznightCode);

     createWebsocketNamespaceForQuiznight(quiznightCode);
     qn.save()
      .then(() => {
        return res.send({ code: quiznightCode })
      });
  });

  quiznightRoute.post('/:quiznightId/rounds', (req, res) => {
    if (req.params.quiznightId) {

      req.body.forEach(element => {
        element.hasBeenReviewed = false;
      });

      Quiznight.update(
        { _id: req.params.quiznightId },
        {
          $push: {
            rounds: {
              chosenQuestions: req.body,
            }
          }
        }
      ).then(data => res.send(data))
    }
  });

  quiznightRoute.get('/', (req, res) => {
    Quiznight.find({}).then(data => {
      return res.send(data);
    })
  })

  return quiznightRoute;
}
