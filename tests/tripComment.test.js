import chai, { expect, request, use } from 'chai';
import app from '../src/app.js';
import chaiHttp from 'chai-http';
import { requesterLogin } from './profile.dummy'

use(chaiHttp);

describe('TRIP COMMENT TESTING', () => {

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
  it('It should get all comment', async() => {
    const res = await request(app)
        .get('/api/v1/trip/5/comments')
        .set('Authorization', `Bearer ${accessTokenRequester}`);
    expect(res).to.have.status([200]);
});

it('It should create a comment', async() => {
    const res = await request(app)
        .post('/api/v1/trip/5/comments')
        .set('Authorization', `Bearer ${accessTokenRequester}`)
        .send({
            comment: 'Test Comment',
        });
    expect(res).to.have.status([201]);
});


});