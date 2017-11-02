import { version } from '../../package.json';
import { Router } from 'express';

import QuestionModel from '../models/Question';
import Quiznight from '../models/Quiznight';

export default () => {
  let question = Router();

  question.get('/', middlewareForQueryPresent, (req, res) => {
    QuestionModel.find({}).then(data => {
      return res.send(data);
    }).catch(err => {
      throw new Error('Can not retrieve questions from db');
    });
  });

  return question;
}

const middlewareForQueryPresent = function (req, res, next) {
  if (req.query.category) {
    if (req.query.random) {
      let limitrecords = 10;
      QuestionModel.count({ 'category': req.query.category }, function (err, count) {
        var skipRecords = getRandom(1, count - limitrecords);
        QuestionModel.find({ 'category': req.query.category }).skip(skipRecords).limit(10)
        .then(data => {
          return res.send(data);
        });
      });
    }
    else {
      QuestionModel.find({ 'category': req.query.category }).then(data => {
        return res.send(data);
      }).catch(err => {
        throw new Error('Can not retrieve questions from db');
      });
    }
  }
  else {
    return next();
  }
}

const getRandom = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
}