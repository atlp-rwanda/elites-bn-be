import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';
import models from '../src/models';

chai.use(chaiHttp);

describe('LOGING OUT A USER', () => {
  let blackListedToken;

  before(async () => {
    await models.User.destroy({ where: { email: 'kelly@gmail.com' } });
  });
  it('it should register the user', async () => {
    const res = await chai.request(app).post('/api/v1/users/register').send({
      names: 'KELLY',
      email: 'kelly@gmail.com',
      password: 'Password1',
    });
    blackListedToken = res.body.payload.accessToken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });
  it('it not should blacklist user token ', async () => {
    const res = await chai.request(app).post('/api/v1/auth/logout')
      .set('Authorization', 'Bearer blackListedT');
    expect(res).to.have.status([401]);
    expect(res.body).to.have.property('status');
  });

  it('it should blacklist user token ', async () => {
    const res = await chai.request(app).post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${blackListedToken}`);
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });
});
