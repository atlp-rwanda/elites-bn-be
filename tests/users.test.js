import chai from 'chai';
import { expect, request, use } from 'chai';
import 'dotenv/config';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

chai.use(chaiHttp);

describe('USER LOGIN', () => {
<<<<<<< HEAD
=======
  it('it should login the user', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'senderone@gmail.com',
      password: 'pass123@'
    });

    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should not login a user with invalid credentials', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'yangeney@gmail.com',
      password: 'Pass@12'
    });
    expect(res).to.have.status([401]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('statusCode');
>>>>>>>  This is a combination of 11 commits.

  it('Should login a user ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/users/login/`)
      .send({
        email: 'ihonore03@gmail.com',
        password: 'Password1'
      })
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  it('it should not login a user with invalid credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'gih@gmail.com',
        password: 'Pass@12'
      })
      .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('statusCode');

      });
    done()
  })

  it('Should create access token using refresh token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/refreshtoken')
      .send({
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZXMiOiJHaWhvem8gSW5ub2NlbnRlIiwiZW1haWwiOiJnaWhvem9AZ21haWwuY29tIiwicm9sZUlkIjo1LCJtYW5hZ2VySWQiOm51bGwsImlzQWN0aXZlIjpudWxsLCJ2ZXJpZmllZCI6bnVsbCwiUm9sZS5pZCI6NSwiUm9sZS5uYW1lIjoicmVxdWVzdGVyIiwiaWF0IjoxNjQ3MjM1ODgwLCJleHAiOjE2NDc4NDA2ODB9.BEC7DcDxZzIO5P216giaJcV-k7lVfuW_EUEev_gS3sQ"
      })

      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).haveOwnProperty('payload');
      })
    done()
  });

  it('Should not create access token from refresh token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/refreshtoken')
      .send({
        "refreshToken": "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZXMiOiJHaWhvem8gSW5ub2NlbnRlIiwiZW1haWwiOiJnaWhvem9AZ21haWwuY29tIiwicm9sZUlkIjo1LCJtYW5hZ2VySWQiOm51bGwsImlzQWN0aXZlIjpudWxsLCJ2ZXJpZmllZCI6bnVsbCwiUm9sZS5pZCI6NSwiUm9sZS5uYW1lIjoicmVxdWVzdGVyIiwiaWF0IjoxNjQ3MjM1ODgwLCJleHAiOjE2NDc4NDA2ODB9.BEC7DcDxZzIO5P216giaJcV-k7lVfuW_EUEev_gS3sQ"
      })

      .end((err, res) => {
        expect(res).to.have.status([500]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('statusCode');
      })
    done()
  });
})