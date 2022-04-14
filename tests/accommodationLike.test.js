import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { requesterLogin } from './profile.dummy';

chai.use(chaiHttp);

describe('ACCOMMODATION LIKE ROUTES TESTING', () => {
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

  it('Should like an accommodation', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/accommodations/1/like`)
      .set('Authorization', `Bearer ${accessTokenRequester}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('Should retrieve all like of an accommodation', async () => {
    const res = await chai.request(app).get(`/api/v1/accommodations/1/likes`);
    expect(res).to.have.status([200]);
  });

  it('Should dislike an accommodation', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/accommodations/1/dislike`)
      .set('Authorization', `Bearer ${accessTokenRequester}`);
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });
});
