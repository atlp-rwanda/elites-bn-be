import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { TRIP_FOUND_MESSAGE } from '../src/constants/tripConstants';
import app from '../src/app.js';
import 'dotenv/config';
import {
  addRequest,
  incorrectDate,
  notRememberMe1,
  updateRequest,
  userLogin_1,
  senderFour,
  senderFive,
  notRememberMe2,
  managerLogins,
  checkStatistics,
  checkStatisticsInvalidDate,
} from './trip.dummyData.js';

chai.use(chaiHttp);
let token;
let tokenB;
let tokenC;
let tokenD;
let adminToken;
let commentId;

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

  it('it should login the another  requester user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(senderFour);
    tokenB = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should login the another  requester user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(senderFive);
    tokenC = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should login the manager', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(managerLogins);

    tokenD = res.body.payload.accesstoken;
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

  //TRIP COMMENTING

  it('It should create a comment', async() => {
    const res = await chai 
        .request(app)
        .post(`/api/v1/trips/${id}/comments`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            comment: 'Test Comment',
        });
        commentId = res.body.payload.id;
    expect(res).to.have.status([201]);
});

it('Manager should create a comment', async() => {
  const res = await chai 
      .request(app)
      .post(`/api/v1/trips/${id}/comments`)
      .set('Authorization', `Bearer ${tokenD}`)
      .send({
          comment: 'Test Comment',
      });
  expect(res).to.have.status([201]);
});

it('It should get all comment for manager', async() => {
  const res = await chai
      .request(app)
      .get(`/api/v1/trips/${id}/comments`)
      .set('Authorization', `Bearer ${tokenD}`);
  expect(res).to.have.status([200]);
});

it('It should get all comment for requester', async() => {
  const res = await chai
      .request(app)
      .get(`/api/v1/trips/${id}/comments`)
      .set('Authorization', `Bearer ${token}`);
     expect(res).to.have.status([200]);
});

it('It should not delete comment when not owner ', async() => {
  const res = await chai
      .request(app)
      .delete(`/api/v1/comments/${commentId}`)
      .set('Authorization', `Bearer ${adminToken}`);
     expect(res).to.have.status([403]);
     expect(res.body).to.have.property('message');
});

it('It should delete comment ', async() => {
  const res = await chai
      .request(app)
      .delete(`/api/v1/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`);
     expect(res).to.have.status([200]);
     expect(res.body).to.have.property('message');
});





  it('Should not create the Trip  Request while not having profile', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${tokenC}`)
      .send(addRequest);
    expect(res).to.have.status([400]);
  });

  it('Should not create the Trip while not having profile and rememberMe is false,passportNumber and address provided ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${tokenC}`)
      .send(notRememberMe1);
    expect(res).to.have.status([400]);
  });

  it('Should not create the Trip while not having profile and rememberMe is false,passportNumber and address not provided ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${tokenC}`)
      .send(notRememberMe2);
    expect(res).to.have.status([400]);
  });

  // // SHOULD NOT CREATE A TRIP REQUEST

  it('should not create a trip request due to validation error', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${token}`)
      .send(incorrectDate);
    expect(res).to.have.status([400]);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it('should not create a trip request when logged in as an admin and rememmberMe is true', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(addRequest);
    expect(res).to.have.status([400]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it('should not create a trip request when logged in as an admin and rememberMe is false', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(notRememberMe1);
    expect(res).to.have.status([403]);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it('Should not create the Trip while not logged in ', async () => {
    const res = await chai.request(app).post('/api/v1/trips').send(addRequest);
    expect(res).to.have.status([401]);
  });

  // // //GETTING SINGLE REQUEST

  it('should retrieve a single request', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/trips/5/')
      .set('Authorization', `Bearer ${tokenB}`);
    expect(res).to.have.status([200]);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it('should not retrieve a trip request', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/trips/100000/')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([404]);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
  });

  // // // SHOULD NOT RETRIEVE PENDING REQUESTS BY USER

  it('should NOT retrieve pending requests by user when not authenticated', async () => {
    const res = await chai.request(app).get('/api/v1/trips/');
    expect(res).to.have.status([401]);
    expect(res.type).to.equal('application/json');
  });

  // // // SHOULD UPDATE THE REQUEST

  it('should UPDATE pending requests by user', async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/trips/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateRequest);
    expect(res).to.have.status([200]);
  });

  it('should not UPDATE pending requests by user', async () => {
    const res = await chai
      .request(app)
      .put('/api/v1/trips/10000')
      .set('Authorization', `Bearer ${token}`)
      .send(updateRequest);

    expect(res).to.have.status([404]);
  });

  // // // DELETING TRIP REQUEST to be continued

  // it('should Delete pending requests by user', async() => {
  //   const res =  await chai
  //     .request(app)
  //     .delete(`/api/v1/trips/${id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     console.log(res)
  //       expect(res).to.have.status([200]);
  //       expect(res.type).to.equal('application/json');
  //       expect(res.body).to.have.property('message');
  //       expect(res.body).to.have.property('status');
  // });

  // APPROVE AND REJECT BY MANAGER

  it(' Manager should APPROVE/REJECT pending request', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/trips/${id}`)
      .set('Authorization', `Bearer ${tokenD}`)
      .send({
        status: 'approved',
      });

    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body).to.have.property('status');
  });

  // // // // SHOULD RETRIEVE ALL REQUESTS BY USER gihozo
  it(' A user should be able to use global search and retrieve data from database with related status approved', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/trips?status="approved"')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });
  it(' A user should be able to use global search and retrieve data from database according to manager ID', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trips?managerId=3`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it(' A user should be able to use global search and retrieve data from database according to Departure Location', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trips?departLocation=1`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it(' A user should be able to use global search and retrieve data from database according to trip reason', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trips?tripReason="this is to test "`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it(' A Manager should be able to use global search and retrieve data from database with related status approved', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/trips?status="approved"')
      .set('Authorization', `Bearer ${tokenD}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });

  it(' A user should be able to use global search and retrieve data from database according to trip reason', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trips?tripReason="this is to test "`)
      .set('Authorization', `Bearer ${tokenD}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
  });
  // SHOULD NOT APPROVE/REJECT

  //   it(' Manager should not APPROVE/REJECT an already updated trip request', async() => {
  //     const res  = await chai
  //       .request(app)
  //       .patch(`/api/v1/trips/4`)
  //       .set('Authorization', `Bearer ${managerToken}`)
  //       .send({
  //         status: 'approved',
  //       })
  //         console.log(res.body, "______________________");
  //         expect(res).to.have.status([400]);
  //         expect(res.body).to.have.property('message');
  //         expect(res.body).to.have.property('status');

  //   });

  // BOOKING A ROOM

  it('should book a room for a requester with an approved trip request', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/rooms/3/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tripId: `${id}`,
        checkinDate: '2022-10-03',
        checkoutDate: '2022-10-04',
      });

    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('status');
  });

  // UNBOOKING ROOM

  it('should unbook a room for user who had booked a room', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/rooms/3/unbooking')
      .set('Authorization', `Bearer ${token}`)
      .send({ tripId: `${id}` });
    expect(res).to.have.status([200]);
  });

  it('should not book a room for a user who is not a requester', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/rooms/1/booking')
      .set('Authorization', `Bearer ${tokenD}`)
      .send({
        tripId: 10,
        checkinDate: '2022-10-03',
        checkoutDate: '2022-12-04',
      });
    expect(res).to.have.status([400]);
  });

  it(' Manager should not APPROVE/REJECT already updated request', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/trips/${id}`)
      .set('Authorization', `Bearer ${tokenD}`)
      .send({
        status: 'approved',
      });
    expect(res).to.have.status([400]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('statusCode');
  });

  // TRIP Statistics
  it('User will be able to retrieve statistics of trips after logged in with valid credentials ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips/tripstats')
      .set('Authorization', `Bearer ${token}`)
      .send(checkStatistics);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body).to.have.property('status');
  });

  it('should not allow user with an invalid address input', async () => {
    const res = await chai.request(app).post('/api/v1/trips/tripstatsssss');
    expect(res).to.have.status([404]);
  });

  it('should not retrieve statistics if input dates are invalid format ISO ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/trips/tripstats')
      .set('Authorization', `Bearer ${token}`)
      .send(checkStatisticsInvalidDate);
    expect(res).to.have.status([400]);
  });
});
