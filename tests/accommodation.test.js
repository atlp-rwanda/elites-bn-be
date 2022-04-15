import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { invalidAccommodation, accommodationData } from './dummyData';
import { brad } from './profile.dummy';

chai.use(chaiHttp);

describe('ACCOMMODATION ROUTES TESTING', () => {
  let id, token;

  it('it should login the user', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send(brad);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should create an accommodation', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/accommodations`)
      .set('Authorization', `Bearer ${token}`)
      .send(accommodationData);
    id = res.body.payload.id;
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('Should retrieve all accommodations', async () => {
    const res = await chai.request(app).get(`/api/v1/accommodations`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('Should retrieve all accommodations in given location', async () => {
    const res = await chai.request(app).get(`/api/v1/accommodations/in/1`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.message).to.equal(
      'These are the accommodations in specified location'
    );
  });

  it('Should not create an accommodation', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/accommodations`)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidAccommodation);
    expect(res).to.have.status([400]);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('accommodation name is required');
  });

  it('Should retrieve one accommodation', async () => {
    const res = await chai.request(app).get(`/api/v1/accommodations/${1}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('Should update accommodation when logged in', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/accommodations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(accommodationData);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });

  it('Should not retrieve an accommodation', async () => {
    const res = await chai.request(app).get(`/api/v1/accommodations/${'eeee'}`);
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('name');
    expect(res.body.name).to.equal('SequelizeDatabaseError');
    expect(res.body).to.have.property('message');
  });

  it('Should delete an accommodation', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/accommodations/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });
});
