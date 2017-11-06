var app = require('../src/app');
var request = require('supertest')(app);
var mocha = require('mocha');
var expect = require('chai').expect;

import mongoose from 'mongoose';
import {db_name, db_port} from '../src/config.json';

import Quiznight from '../src/models/Quiznight';

describe('Quizzer API', () => {
  var testCategory;
  var testChosenQuestions;
  var gameCode;

  before('Create test data', () => {
    testCategory = 'Geography';
    testChosenQuestions = [
      {
        _id: "question1"
      }
    ];
  });

  after('delete all test data', () => {
    mongoose.connect(`mongodb://localhost:${db_port}/${db_name}`);

    Quiznight.remove({}, (err) => {
      if (err)
        return err;
      }
    );
    mongoose.connection.close();
  });

  describe('GET /categories', () => {
    it('should return all question categories', (done) => {
      request.get('/categories').expect('Content-Type', /json/).expect('Content-Type', /utf-8/).expect(200).end((err, res) => {
        if (err)
          return done(err);
        expect(res.body).to.be.a('array');
        done();
      });
    });
  });

  describe('GET /questions (all questions)', () => {
    it('should return all questions', (done) => {
      request.get('/questions').expect('Content-Type', /json/).expect('Content-Type', /utf-8/).expect(200).end((err, res) => {
        if (err)
          return done(err);
        expect(res.body).to.be.a('array').and.to.not.be.empty;
        done();
      });
    });
  });

  describe('GET /questions (category specific questions)', () => {
    it('should return all questions specific to category', (done) => {
      request.get('/questions').query({category: testCategory}).expect('Content-Type', /json/).expect('Content-Type', /utf-8/).expect(200).end((err, res) => {
        if (err)
          return done(err);
        expect(res.body).to.be.a('array').and.to.not.be.empty;
        done();
      });
    });
  });

  describe('POST /quiznights', () => {
    it('should return a quiznight code', (done) => {
      request.post('/quiznights').expect('Content-Type', /json/).expect('Content-Type', /utf-8/).expect(200).end((err, res) => {
        if (err)
          return done(err);
        expect(res.body).to.have.property('code').and.to.not.be.null;
        gameCode = res.body.code;
        done();
      });
    });
  });

  describe('GET /quiznights', () => {
    it('should return all quiznights', (done) => {
      request.get('/quiznights').expect(200).end((err, res) => {
        if (err)
          return done(err);
        expect(res.body).to.be.a('array').and.to.not.be.empty;
        done();
      });
    });
  });

  describe('POST /quiznights/:quiznightId/rounds', () => {
    it('should return saved round notification', (done) => {
      request.post(`/quiznights/${gameCode}/rounds`).send(testChosenQuestions).expect('Content-Type', /json/).expect('Content-Type', /utf-8/).expect(200).end((err, res) => {
        if (err)
          return done(err);
        expect(res.body).to.be.a('object').and.to.have.property('ok').and.to.equal(1);
        done();
      });
    });
  });
});
