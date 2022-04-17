import fs from 'fs';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import 'dotenv/config';
import {
  requesterLogin,
  managerLogin,
  adminLogin,
  userLogin,
} from './profile.dummy';

chai.use(chaiHttp);

describe('CREATE PROFILE', () => {
  let token;
  let profileId;

  it('it should login the user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(requesterLogin);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });
  // SHOULD CREATE PROFILE

  it('should create a PROFILE  while user loggedin', (done) => {
    chai
      .request(app)
      .post('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field({
        gender: 'Female',
        birthdate: '2000-12-12',
        language: 'english',
        currency: 'USD',
        residence: 2,
        department: 'marketing',
        passportNumber: 'PC-1455',
        address: 'KAMPALA-ENTEBE',
      })
      .attach({ picture: fs.readFileSync(`${__dirname}/image/download.jpeg`) })
      .end((req, res) => {
        profileId = res.body.payload.id;
        expect(res).to.have.status([201]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        done();
      });
  });

  it('should not create a PROFILE  while user loggedin', (done) => {
    chai
      .request(app)
      .post('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field({
        gender: 'Female',
        birthdate: '2024-12-12',
        language: 'english',
        currency: 'USD',
        residence: 2,
        department: 'marketing',
        passportNumber: 'PC-452',
        address: 'KAMPALA-ENTEBE',
      })
      .attach({ picture: fs.readFileSync(`${__dirname}/image/download.jpeg`) })
      .end((req, res) => {
        expect(res).to.have.status([500]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'Validation error, incorrect birthdate field'
        );
        done();
      });
  });

  it('should get user profile', (done) => {
    chai
      .request(app)
      .get(`/api/v1/profiles/${profileId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        done();
      });
  });

  it('should not get all users profile, since not manager or admin', (done) => {
    chai
      .request(app)
      .get('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([403]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should update user profile', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field({
        gender: 'male',
        birthdate: '2000-12-12',
        language: 'english updated',
        currency: 'rwanda',
        residence: 2,
        department: 'marketing',
      })
      .attach({ picture: fs.readFileSync(`${__dirname}/image/download.jpeg`) })
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        done();
      });
  });

  it('should delete user profile', (done) => {
    chai
      .request(app)
      .delete('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        done();
      });
  });
});

// checking manager

describe('CKECKING MANAGER', () => {
  let token;
  let tokenOne;

  it('it should login the user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(managerLogin);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });
  // SHOULD CREATE TRIP FOR REQUESTER

  it('should create a PROFILE  while user loggedin', (done) => {
    chai
      .request(app)
      .post('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field({
        gender: 'Female',
        birthdate: '2000-12-12',
        language: 'english',
        currency: 'USD',
        residence: 2,
        department: 'marketing',
        passportNumber: 'PC-785',
        address: 'KAMPALA-KABARE',
      })
      .attach({ picture: fs.readFileSync(`${__dirname}/image/download.jpeg`) })
      .end((req, res) => {
        expect(res).to.have.status([201]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        done();
      });
  });

  it('should get user profile', (done) => {
    chai
      .request(app)
      .get('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('payload');
        done();
      });
  });

  it('should delete user profile', (done) => {
    chai
      .request(app)
      .delete('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        done();
      });
  });

  it('it should login the user without profile', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(userLogin);
    tokenOne = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('should not delete user profile', (done) => {
    chai
      .request(app)
      .delete('/api/v1/profiles')
      .set('Authorization', `Bearer ${tokenOne}`)
      .end((req, res) => {
        expect(res).to.have.status([404]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('statusCode');
        done();
      });
  });
});

// checking admin

describe('CKECKING ADMIN', () => {
  let token;

  it('it should login the user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(adminLogin);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('should get all user profiles', (done) => {
    chai
      .request(app)
      .get('/api/v1/profiles')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('payload');
        done();
      });
  });
});
