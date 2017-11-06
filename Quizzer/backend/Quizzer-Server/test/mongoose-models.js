import {db_name, db_port} from '../src/config.json';
import {expect} from 'chai';
import express from 'express';
import mocha from 'mocha';
import mongoose from 'mongoose';

import Quiznight from '../src/models/Quiznight';
import Question from '../src/models/Question';

/* NO VALIDATION NECESSARY FOR CATEGORY AS IT ONLY CONTAINS AN _id FIELD */
describe('Mongoose model tests', () => {

  before('Connect to Quizzer database', () => {
    mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`);
  });

  after('Close database connection', () => {
    mongoose.connection.close();
  });

  describe('Quiznight model', () => {
    it('Should be invalid if all fields are empty', (done) => {

      let qn = new Quiznight();

      qn.save((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('Should be invalid if there are no rounds', (done) => {
      let qnNoRounds = {
        _id: "abcd1234",
        teams: [
          {
            _id: "Nano peasants",
            roundPoints: 0
          }
        ]
      }

      let qn = new Quiznight({});

      qn.save((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('Question model', () => {
    it('should be invalid if all fields are empty', (done) => {
      let q = new Question();

      q.validate(err => {
        expect(err.errors.answer).to.exist;
        expect(err.errors.category).to.exist;
        done();
      });
    });
  });
});
