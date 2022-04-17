import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import { adminLogin } from './profile.dummy';

chai.use(chaiHttp);

describe('UPDATE ROLE USER TESTS', () => {
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

  it('should assign a role to a user', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/users/updateRole/4')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'seeduser@gmail.com',
      });
    expect(res).to.have.status([200]);
  });

  it("should not assign a role to a user if role doesn't exist", async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/users/updateRole/9')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'seeduser@gmail.com',
      });

    expect(res).to.have.status([400]);
  });

  it("should not assign a role a user if email doesn't exist", async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/users/updateRole/4')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'seedusgmail.com',
      });

    expect(res).to.have.status([400]);
  });
});
