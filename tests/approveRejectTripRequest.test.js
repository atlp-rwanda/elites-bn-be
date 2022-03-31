/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable quotes */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import { TRIP_CREATED, REQUEST_UPDATED } from '../src/constants/tripConstants';
import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import 'dotenv/config';
import { requeLogin, managerToken } from './trip.dummyData.js';

let id;

use(chaiHttp);
describe('TRIP REQUEST ENDPOINTS', () => {
  it('it should login the user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send(requeLogin)

      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('payload');
      });
    done();
  });

  // SHOULD UPDATE THE REQUEST
  it(' Manager should APPROVE/REJECT pending request', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/4`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        status: 'approved',
      })
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(REQUEST_UPDATED);
      });
    done();
  });
});
