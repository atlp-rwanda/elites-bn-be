import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { expiredToken } from './dummyData';
import { resetPassword } from './profile.dummy'

chai.use(chaiHttp);

describe('FORGOT & RESET PASSWORD TEST', () => {
  let token;


  it('Should send a reset password link ', async() => {
    const res = await chai
      .request(app)
      .post(`/api/v1/users/forgot-password`)
      .send({ email: 'ihonore03@gmail.com' })
      console.log(res.body,'should reset pass =================================================')
       token =  res.body.payload.token;
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'Password reset link has been successfully sent to ihonore03@gmail.com'
        );
  });

  it('Should reset password', async() => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/users/reset-password/${token}`)
      .send( resetPassword )
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'The password has been reset successfully'
        );
  });

  it('Should not send a reset password link with uniregistered email', async() => {
    const res = await chai
      .request(app)
      .post(`/api/v1/users/forgot-password`)
      .send({ email: 'unregistered12@gmail.com' })
        expect(res).to.have.status([404]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'The account with provided email is not registered'
        );
  });

  it('Should not send a reset password link with invalid email', async() => {
    const res = await chai
      .request(app)
      .post(`/api/v1/users/forgot-password`)
      .send({ email: 'invalidmail.com' })
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Enter a valid email address');
  });

  it('Should not reset password with expired token', async() => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/users/reset-password/${expiredToken}`)
      .send({ password: 'Password123', confirmPassword: 'Password123' })
        expect(res).to.have.status([500]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('TokenExpiredError');
        expect(res.body.message).to.equal('jwt expired');
  });
});
