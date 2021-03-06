import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { roomData, invalidRoomData } from './dummyData';
import { brad } from './profile.dummy';

chai.use(chaiHttp);

describe('ROOM ENDPOINTS TEST', () => {
  let id; let
    token;

  it('it should login the user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(brad);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should add a room ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send(roomData);
    id = res.body.payload.id;
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('should retrieve all rooms of an accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/accommodations/${1}/rooms`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('should get a single room in accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/rooms/${id}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('should update a specific room of an accommodation', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/rooms/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(roomData);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });

  it('should delete a room of a specific accommodation', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/rooms/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });

  it('Should not retrieve a room', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/rooms/${'g354'}`);
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('name');
    expect(res.body.name).to.equal('SequelizeDatabaseError');
    expect(res.body).to.have.property('message');
  });
  it('should not update a room with wrong data format', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/rooms/${3}`)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidRoomData);
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('name');
    expect(res.body.name).to.equal('SequelizeDatabaseError');
    expect(res.body).to.have.property('message');
  });
});
