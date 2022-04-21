import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { locationData } from './dummyData';
import { brad, requesterLogin } from './profile.dummy';

chai.use(chaiHttp);

describe('LOCATION ENDPOINTS TEST', () => {
  let id; let token; let
    requesterToken;

  it('it should login a manager', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send(brad);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should login a requester', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(requesterLogin);
    requesterToken = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should add a location ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/locations')
      .set('Authorization', `Bearer ${token}`)
      .send(locationData);
    id = res.body.payload.id;
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('should get a single location with given ID', async () => {
    const res = await chai.request(app).get(`/api/v1/locations/${id}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('should update a specific location', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/locations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(locationData);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });

  it('Should not retrieve a location', async () => {
    const res = await chai.request(app).get('/api/v1/locations/kjoo354');
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('name');
    expect(res.body.name).to.equal('SequelizeDatabaseError');
    expect(res.body).to.have.property('message');
  });

  it('should not update location when not travel admin', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/locations/${id}`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .send({ description: 'test description' });
    expect(res).to.have.status([403]);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('You are not a travel admin');
  });

  it('should delete a location', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/locations/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });
});
