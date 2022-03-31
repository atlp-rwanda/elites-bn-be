import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import 'dotenv/config';
import token from './verifyEmailDummyData';

use(chaiHttp);
describe('verifying a user who is registered ', () => {
  it('should verify a registered user ', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/verifyEmail/:token')
      .send({
        token,
      })
      .end((error, res) => {
        expect(res.body).to.have.property('message');
      });
    done();
  });
});
