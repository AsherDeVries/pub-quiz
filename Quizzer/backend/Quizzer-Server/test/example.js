import api from '../src/app';
import { db_name } from '../src/config.json';
import { expect } from 'chai';
import express from 'express';
import mocha from 'mocha';
import mongoose from 'mongoose';
import request from 'supertest';
import { Router } from 'express';

import Answer from '../src/models/Answer';
import Quizround from '../src/models/Quizround';
import Quiznight from '../src/models/Quiznight';
import Team from '../src/models/Team';
import Teamstatistic from '../src/models/Teamstatistic';

const app = express();

describe('Test example saving quiznight', () => {
  before('Before test example', () => {
    mongoose.connect('mongodb://localhost/' + db_name);

    let qn = new Quiznight({
			_id: "abcd1234",
			teams: [{
				_id: "Nano peasants",
				roundPoints: 0
			}],
			rounds: [{
				_id: 1,
				teamStatistics: [{
					team: "Nano peasants",
					givenAnswers: [{
						value: "got no idea :("
					}],
					correctAnswersAmount: 0
				}],
				chosenQuestions: [{
					_id: "How does one leave Vim?",
					hasBeenReviewed: false
				}]
			}]
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