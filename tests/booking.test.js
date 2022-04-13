import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

chai.use(chaiHttp);

describe('BOOK A ROOM', () => {
  let token = '';
  let notRequesterToken = '';
  let noTripRequestToken = '';

  /*  before('it should login the user', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'senderone@gmail.com',
      password: 'pass123@',
    });

    token = res.body.payload.accesstoken;

    const unbookRoom = await chai
      .request(app)
      .patch('/api/v1/rooms/3/3/unbooking')
      .set('Authorization', `Bearer ${token}`);
  }); */

  it('should book a room for a requester with an approved trip request', async () => {
    const login = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send({ email: 'senderone@gmail.com', password: 'pass123@' });
    token = login.body.payload.accesstoken;
    const res = await chai
      .request(app)
      .post('/api/v1/rooms/3/3/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        checkinDate: '2022-10-03',
        checkoutDate: '2022-10-04',
      });

    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('status');
  });

  before('it should login the user who is not a requester', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'yangeney@gmail.com',
      password: 'password',
    });

    notRequesterToken = res.body.payload.accesstoken;
  });

  it('should not book a room for a user who is not a requester', (done) => {
    chai
      .request(app)
      .post('/api/v1/rooms/1/10/booking')
      .set('Authorization', `Bearer ${notRequesterToken}`)
      .send({
        checkinDate: '2022-10-03',
        checkoutDate: '2022-12-04',
      })
      .end((error, res) => {
        expect(res).to.have.status([403]);
      });

    done();
  });

  it('should not book a room for a user if the room does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/rooms/100/10/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        checkinDate: '2022-10-05',
        checkoutDate: '2022-10-06',
      })
      .end((error, res) => {
        expect(res).to.have.status([403]);
      });

    done();
  });

  it('should not book a room for a user if already booked', (done) => {
    chai
      .request(app)
      .post('/api/v1/rooms/3/10/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        checkinDate: '2022-10-05',
        checkoutDate: '2022-10-06',
      })
      .end((error, res) => {
        expect(res).to.have.status([403]);
      });

    done();
  });

  before('it should login the user with no trip requests', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'senderfour@gmail.com',
      password: 'pass123@',
    });

    noTripRequestToken = res.body.payload.accesstoken;
  });

  it('should not book a room for a user if no trip request has been made', (done) => {
    chai
      .request(app)
      .post('/api/v1/rooms/3/10/booking')
      .set('Authorization', `Bearer ${noTripRequestToken}`)
      .send({
        checkinDate: '2022-01-05',
        checkoutDate: '2022-03-06',
      })
      .end((error, res) => {
        expect(res).to.have.status([403]);
      });

    done();
  });

  it('should unbook a room for user who had booked a room', (done) => {
    chai
      .request(app)
      .patch('/api/v1/rooms/3/3/unbooking')
      .set('Authorization', `Bearer ${token}`)
      .end((error, res) => {
        expect(res).to.have.status([200]);
      });
    done();
  });

  it('should not unbook a room for user who had not booked a room', (done) => {
    chai
      .request(app)
      .patch('/api/v1/rooms/2/3/unbooking')
      .set('Authorization', `Bearer ${noTripRequestToken}`)
      .end((error, res) => {
        expect(res).to.have.status([403]);
      });
    done();
  });
});
