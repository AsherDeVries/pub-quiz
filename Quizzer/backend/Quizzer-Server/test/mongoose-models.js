import {db_name, db_port} from '../src/config.json';
import {expect} from 'chai';
import express from 'express';
import mocha from 'mocha';
import mongoose from 'mongoose';

import Quiznight from '../src/models/Quiznight';
import Question from '../src/models/Question';

/*
NO VALIDATION NECESSARY FOR CATEGORY AS IT ONLY CONTAINS AN _id FIELD
*/
/*
UNABLE TO VALIDATE QUIZNIGHTS DUE TO MONGOOSE'S INABILITY TO VALIDATE EMBEDDED DOCUMENTS
*/

describe('Mongoose model tests', () => {
/*
  describe('Quiznight model', () => {
    it('Should be invalid if all fields are empty', (done) => {
      let qn = new Quiznight();

      qn.validate((err) => {

      });
    });
  });
*/
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
