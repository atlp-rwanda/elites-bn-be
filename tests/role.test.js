import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

chai.use(chaiHttp);

describe('UPDATE ROLE USER TESTS', () => {
  let token = '';

  before('it should login an admin', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'yangeney@gmail.com',
      password: 'password',
    });

    token = res.body.payload.accesstoken;
  });

  it('should assign a role to a user', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/updateRole/4')
      .send({
        email: 'seeduser@gmail.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([200]);
      });

    done();
  });

  it("should not assign a role to a user if role doesn't exist", (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/updateRole/9')
      .send({
        email: 'seeduser@gmail.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([400]);
      });
    done();
  });

  it("should not assign a role a user if email doesn't exist", (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/updateRole/4')
      .send({
        email: 'seedusgmail.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .end((req, res) => {
        expect(res).to.have.status([400]);
      });

    done();
  });
});