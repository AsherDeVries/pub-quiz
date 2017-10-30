import request from 'supertest';
import express from 'express';
import api from '../src/app';

import mocha from 'mocha';
import { expect } from 'chai';

const app = express();

describe('Test examples', () => {
  before('Before test example', () => {

  });

  after('After test example', () => {

  });

  describe('Test example', () => {
    it('Should run test', () => {
      expect(true).to.equal(true);
    });
  });

  describe('Test example endpoint /', function() {
    it('Respond with 404', function(done) {
      request(api)
      .get('/')
      .expect(404, done);
    });
  });
});