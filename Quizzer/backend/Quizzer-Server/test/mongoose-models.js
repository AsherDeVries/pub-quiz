/*
import api from '../src/app';
import { db_name, db_port} from '../src/config.json';
import { expect } from 'chai';
import express from 'express';
import mocha from 'mocha';
import mongoose from 'mongoose';
import request from 'supertest';
import { Router } from 'express';

import Quiznight from '../src/models/Quiznight';
import Question from '../src/models/Question';
import Category from '../src/models/Category';

const app = express();

describe('Test example saving quiznight', () => {
  before('Before test example', () => {
    mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`);

    let qn = new Quiznight({
			_id: "abcd1234",
			teams: [{
				_id: "Nano peasants",
				roundPoints: 0
			}],
			rounds: [
        {
          _id: 1,
          teamStatistics: [{
            team: "Nano peasants",
            givenAnswers: [{
              question: "How does one leave Vim?",
              value: "got no idea :("
            }],
            correctAnswersAmount: 0
          }],
          chosenQuestions: [{
            _id: "How does one leave Vim?",
            hasBeenReviewed: false
          }]
        }
      ]
		});

		qn.save();
  });

  after('After test example', () => {
    Quiznight.findOne({ _id: "abcd1234" }).remove().exec();
    mongoose.connection.close();
  });

  describe('Log quiznight in database', () => {
    it('Should log data of added quiznight', () => {
      let result = Quiznight.findOne({ _id: "abcd1234" }, (err, quizNight) => {
        console.log("--DATA OF ADDED QUIZNIGHT--");
        console.log(quizNight);
      });
      expect(result).to.not.be.null;
    });
  });
});

describe('Test example saving question', () => {
  before('Before test example', () => {
    mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`);;

    let question = new Question({
			_id: "How does one leave Vim?",
			correctAnswer: "They don't",
      category: "Battle of Editors"
		});

		question.save();
  });

  after('After test example', () => {
    Question.findOne({ _id: "How does one leave Vim?" }).remove().exec();
    mongoose.connection.close();
  });

  describe('Log question in database', () => {
    it('Should log data of added question', () => {
      let result = Question.findOne({ _id: "How does one leave Vim?" }, (err, question) => {
        console.log("--DATA OF ADDED QUESTION--");
        console.log(question);
      });
      expect(result).to.not.be.null;
    });
  });
});

describe('Test example saving category', () => {
  before('Before test example', () => {
    mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`);

    let category = new Category({
      _id: "Battle of Editors"
		});

		category.save();
  });

  after('After test example', () => {
    Category.findOne({ _id: "Battle of Editors" }).remove().exec();
    mongoose.connection.close();
  });

  describe('Log question in database', () => {
    it('Should log data of added category', () => {
      let result = Category.findOne({ _id: "Battle of Editors" }, (err, category) => {
        console.log("--DATA OF ADDED CATEGORY--");
        console.log(category);
      });
      expect(result).to.not.be.null;
    });
  });
});
*/
