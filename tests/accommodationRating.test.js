import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { requesterLogin } from './profile.dummy';

chai.use(chaiHttp);

describe('ACCOMMODATION RATING ROUTES TESTING', () => {
  let accessTokenRequester;

  it('it should login the user', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/login')
      .send(requesterLogin);
    accessTokenRequester = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should retrieve all accommodations rating', async () => {
    const res = await chai.request(app).get('/api/v1/accommodations/1/reviews');
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('Should create an accommodation rating', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/accommodations/1/reviews')
      .set('Authorization', `Bearer ${accessTokenRequester}`)
      .send({
        rating: 5,
        feedback: 'Feedback Test',
      });
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('Should not create an accommodation rating', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/accommodations/1/reviews')
      .set('Authorization', `Bearer ${accessTokenRequester}`)
      .send({
        rating: 6,
        feedback: 'Feedback Test',
      });
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('message');
  });
});
