import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { expiredToken } from './dummyData';

chai.use(chaiHttp);

describe('FORGOT & RESET PASSWORD TEST', () => {
  it('Should send a reset password link ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/users/forgot-password`)
      .send({ email: 'ihonore03@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'Password reset link has been successfully sent to ihonore03@gmail.com'
        );
      });
    done();
  });
  it('Should not send a reset password link with uniregistered email', (done) => {
    chai
      .request(app)
      .post(`/api/v1/users/forgot-password`)
      .send({ email: 'unregistered12@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status([404]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'The account with provided email is not registered'
        );
      });
    done();
  });

  it('Should not send a reset password link with invalid email', (done) => {
    chai
      .request(app)
      .post(`/api/v1/users/forgot-password`)
      .send({ email: 'invalidmail.com' })
      .end((err, res) => {
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Enter a valid email address');
      });
    done();
  });

  it('Should not reset password with expired token', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/users/reset-password/${expiredToken}`)
      .send({ password: 'Password123', confirmPassword: 'Password123' })
      .end((err, res) => {
        expect(res).to.have.status([500]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('TokenExpiredError');
        expect(res.body.message).to.equal('jwt expired');
      });
    done();
  });
});
