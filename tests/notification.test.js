import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { token } from './dummyData';

chai.use(chaiHttp);

describe('NOTIFICATIONS ENDPOINTS TEST', () => {
  it('Should retrieve all notifications of a logged in user  ', (done) => {
    chai
      .request(app)
      .get(`/api/v1/notifications`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
      });
    done();
  });

  it('should not retrieve notifications for unauthenticated user', (done) => {
    chai
      .request(app)
      .get(`/api/v1/notifications`)
      .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('You are not authorized, Please login');
      });
    done();
  });

  it('should opt out email notifications for user', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/notifications/subscribe`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
      });
    done();
  });

  it('should turn on email notifications for user', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/notifications/unsubscribe`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
      });
    done();
  });
  it('Should not retrieve unexist notification', (done) => {
    chai
      .request(app)
      .get(`/api/v1/notifications/${2000}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([404]);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Not found');
        expect(res.body).to.have.property('message');
      });
    done();
  });
  it('Should mark all as read', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/notifications/markallasread`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
      });
    done();
  });
  it('Should not mark all as read if he has not logged in', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/notifications/markallasread`)
      .set('Authorization', `Bearer `)
      .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('error');
      });
    done();
  });
});
