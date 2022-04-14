import chai,{ expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import models from '../src/models';
use(chaiHttp);


describe('USER REGISTER A USER', () => {

  let accessToken;
  before(async () => {
    await models.User.destroy({ where: { email: 'elites@gmail.com' } });
  });
  it('it should register the user', async () => {
    const res = await chai
    .request(app).post('/api/v1/users/register')
    .send({
      names: 'elites',
      email: 'elites@gmail.com',
      password: 'Pass12515858',
    });
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

    it('it should not register a user with existing email ', async () => {
      const res = await chai
      .request(app).post('/api/v1/users/register')
      .send({
        names: 'YANGENEYE Patrick',
        email: 'yangeney@gmail.com',
        password: 'password',
      });
      expect(res.body).to.have.property('message');
      expect(res).to.have.status([400]);
  });

  it('Should login a user ', async () => {
    const res =  await chai
      .request(app)
      .post(`/api/v1/users/login/`)
      .send({
        email: 'elites@gmail.com',
        password: 'Pass12515858',
      })
      accessToken = res.body.payload.accesstoken;
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        expect(res.body).to.have.property('status');
  });

  it('it should not login a user with invalid credentials', async() => {
    const res =  await chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'gih@gmail.com',
        password: 'Pass@12',
      })
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('statusCode');
  });

  // CREATING REFRESH TOKEN to be continued

  // it('Should create access token using refresh token', async() => {
  //   const res = await chai
  //     .request(app)
  //     .post('/api/v1/users/refreshtoken')
  //     .send({
  //       refreshToken: accessToken
  //     })
  //       console.log(res.body,'this is testing on refresh token =========================')
  //       expect(res).to.have.status([200]);
  //       expect(res.body).to.have.property('message');
  //       expect(res.body).to.have.property('status');
  //       expect(res.body).haveOwnProperty('payload');
  // });


});
