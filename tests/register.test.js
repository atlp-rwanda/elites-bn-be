import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import models from '../src/models';
import { decodeAcessToken } from '../src/helpers/jwtFunction';
use(chaiHttp);

describe('USER REGISTER A USER', () => {
  let accessToken, refreshToken, userId, token;

  before(async () => {
    await models.User.destroy({ where: { email: 'elites@gmail.com' } });
  });
  it('it should register the user', async () => {
    const res = await chai.request(app).post('/api/v1/users/register').send({
      names: 'elites',
      email: 'elites@gmail.com',
      password: 'Pass12515858',
    });
     token = res.body.payload.accessToken;
     const tok= await decodeAcessToken(token);
    userId=tok.id;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should not register a user with existing email ', async () => {
    const res = await chai.request(app).post('/api/v1/users/register').send({
      names: 'YANGENEYE Patrick',
      email: 'yangeney@gmail.com',
      password: 'password',
    });
    expect(res.body).to.have.property('message');
    expect(res).to.have.status([400]);
  });

  it('Should login a user ', async () => {
    const res = await chai.request(app).post(`/api/v1/users/login/`).send({
      email: 'yangeney@gmail.com',
      password: 'password',
    });
    token= res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body).to.have.property('status');
  });

  it('it should assign a manager to user ', async () => {
    const res = await chai
    .request(app)
    .patch(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      manager: 3, 
    });
    expect(res.body).to.have.property('message');
    expect(res).to.have.status([200]);
  });

  it('it should not assign a manager to user ', async () => {
    const res = await chai
    .request(app)
    .patch(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      manager: 3, 
    });
    expect(res.body).to.have.property('message');
    expect(res).to.have.status([500]);
  });

  it('Should login a user ', async () => {
    const res = await chai.request(app).post(`/api/v1/users/login/`).send({
      email: 'elites@gmail.com',
      password: 'Pass12515858',
    });
    accessToken = res.body.payload.accesstoken;
    refreshToken = res.body.payload.refreshToken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body).to.have.property('status');
  });

  it('it should not login a user with invalid credentials', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send({
      email: 'gih@gmail.com',
      password: 'Pass@12',
    });
    expect(res).to.have.status([401]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('statusCode');
  });

  //CREATING REFRESH TOKEN to be continued

  it('Should create access token using refresh token', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/refreshToken')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ refreshToken });
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should not create access token using refresh token', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/users/refreshToken')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        refreshToken: 'eyJhbGciiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI',
      });
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('statusCode');
  });
});
