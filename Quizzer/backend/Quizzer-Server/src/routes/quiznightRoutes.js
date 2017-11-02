import { version } from '../../package.json';
import { Router } from 'express';

import QuestionModel from '../models/Question';
import Quiznight from '../models/Quiznight';

export default () => {
  let quiznightRoute = Router();
  
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
      ).then(data => res.send("saved"))
    }
  });

  quiznightRoute.get('/', (req, res) => {
    Quiznight.find({}).then(data => {
      return res.send(data);
    })
  })

  return quiznightRoute;
}