import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';
import { requestValidationStats } from '../src/validations/tripRequest/tripstatsValidations';

import { token } from './dummyData';

use(chaiHttp);

describe('NOTIFICATIONS ENDPOINTS TEST', () => {
  it('User will be able to retrieve statistics of trips  ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/trips/tripstats`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  it('should not allow user without logged in', (done) => {
    chai
      .request(app)
      .post(`/api/v1/trips/tripstats`)

      .set('Authorization', `Bearer`)
      .end((err, res) => {
        expect(res).to.have.status([403]);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('You are not authorized, Please login');
      });
    done();
  });

  it('should not allow user with an invalid input', (done) => {
    chai.request(app).end((err, res) => {
      expect(res).to.have.status([401]);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('You are not authorized, Please login');
    });
    done();
  });
});
