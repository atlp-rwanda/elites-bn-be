import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import 'dotenv/config';
import models from '../src/models';

chai.use(chaiHttp);
let token;
describe('verifying a user who is registered ', () => {

  before(async () => {
    await models.User.destroy({ where: { email: 'hirwa@gmail.com' } });
  });
  it('it should register a user.', async () => {
    const res = await chai.request(app).post('/api/v1/users/register').send({
      names: 'Hirwa Claude',
      email: 'hirwa@gmail.com',
      password: 'Password123',
    });
    token = res.body.payload.accessToken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('should verify a registered user ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/users/verifyEmail/${token}`)
      .send({
        token,
      });
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
  });
});
