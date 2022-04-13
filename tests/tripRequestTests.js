import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  FAILED_TRIP,
  TRIP_FOUND_MESSAGE,
  TRIP_DELETED_MESSAGE,
  NO_TRIP_FOUND,
  ERROR_DATES,
  VALIDATION_ERROR,
  LOGGED_IN_SUCCESS,
} from '../src/constants/tripConstants';
import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import 'dotenv/config';
import {
  addRequest,
  incorrectDate,
  notRememberMe1,
  updateRequest,
  requesterLogin,
  userLogin_1,
} from './trip.dummyData.js';
import { adminLogin } from './profile.dummy';

chai.use(chaiHttp);
let token;
let adminToken;

describe('TRIP REQUEST ENDPOINTS', () => {
  let id;

  before('it should login the an admin user', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'yangeney@gmail.com',
      password: 'password',
    });

    adminToken = res.body.payload.accesstoken;

    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it('it should login the user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(userLogin_1);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  // SHOULD CREATE TRIP FOR REQUESTER

  it('Should create the Trip  Request while logged as Requester', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${token}`)
      .send(addRequest);
    id = res.body.payload.id;

    expect(res).to.have.status([201]);
  });

  it('should create a trip request when remember attribute is true and logged in as requester', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${token}`)
      .send(addRequest)
      .end((req, res) => {
        expect(res).to.have.status([201]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  // SHOULD NOT CREATE A TRIP REQUEST

  it('should not create a trip request due to validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${token}`)
      .send(incorrectDate)
      .end((req, res) => {
        expect(res).to.have.status([400]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(VALIDATION_ERROR);
      });
    done();
  });

  // // SHOULD NOT CREATE A TRIP REQUEST
  it('should  NOT create a trip request', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${token}`)
      .send(incorrectDate)
      .end((req, res) => {
        expect(res).to.have.status([400]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(VALIDATION_ERROR);
      });
    done();
  });

  // SHOULD NOT CREATE A TRIP REQUEST
  it('should  NOT create a trip request', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${token}`)
      .send(incorrectDate)
      .end((req, res) => {
        expect(res).to.have.status([400]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(VALIDATION_ERROR);
      });
    done();
  });

  it('should not create a trip request when logged in as an admin and rememmberMe is true', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(addRequest)
      .end((req, res) => {
        expect(res).to.have.status([403]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  it('should not create a trip request when logged in as an admin and rememberMe is false', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(notRememberMe1)
      .end((req, res) => {
        expect(res).to.have.status([403]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  // // SHOULD RETRIEVE ALL REQUESTS BY USER

  it('should retrieve all requests', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        id = res.body.payload[0].id;
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(TRIP_FOUND_MESSAGE);
      });
    done();
  });

  // //GETTING SINGLE REQUEST

  it('should retrieve a single request', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/5/')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  it('should not retrieve a trip request', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/100000/')
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([404]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
      });
    done();
  });

  // // SHOULD NOT RETRIEVE PENDING REQUESTS BY USER

  it('should NOT retrieve pending requests by user when not authenticated', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/')
      .end((req, res) => {
        expect(res).to.have.status([401]);
        expect(res.type).to.equal('application/json');
      });
    done();
  });

  // // SHOULD UPDATE THE REQUEST

  it('should UPDATE pending requests by user', (done) => {
    chai
      .request(app)
      .put(`/api/v1/trips/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateRequest)
      .end((req, res) => {
        expect(res).to.have.status([404]);
        expect(res.type).to.equal('text/html');
      });
    done();
  });
  // // DELETING TRIP REQUEST

  it('should Delete pending requests by user', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/trips/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
      });
    done();
  });
});
