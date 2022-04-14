import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

// import { token } from './dummyData';
import { jane } from './profile.dummy';

chai.use(chaiHttp);

describe('NOTIFICATIONS ENDPOINTS TEST', () => {
  let token;

  it('it should login the user', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send(jane);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should retrieve all notifications of a logged in user  ', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/notifications`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('should not retrieve notifications for unauthenticated user', async () => {
    const res = await chai.request(app).get(`/api/v1/notifications`);
    expect(res).to.have.status([401]);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('You are not authorized, Please login');
  });

  it('should opt out email notifications for user', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/notifications/subscribe`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });

  it('should turn on email notifications for user', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/notifications/unsubscribe`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });
  it('Should not retrieve unexisting notification', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/notifications/${2000}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status([404]);
    expect(res.body).to.have.property('name');
    expect(res.body.name).to.equal('Not found');
    expect(res.body).to.have.property('message');
  });
  it('Should mark all as read', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/notifications/markallasread`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([409]);
    expect(res.body).to.have.property('message');
  });

  it('Should not mark all as read if he has not logged in', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/notifications/markallasread`);
    expect(res).to.have.status([401]);
    expect(res.body).to.have.property('error');
  });
});
