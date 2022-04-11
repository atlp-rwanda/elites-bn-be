import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import db from '../src/models';
import { UserControllers } from '../src/controllers/userController';

chai.use(chaiHttp);

describe('AUTHORIZED USER LOGIN', () => {
  it('it should login the user through google',  (done) => {
    chai
    .request(app)
    .get('/api/v1/users/auth/google')
    .send({})
    .end((err,res)=>{
      expect(res).to.have.status([200]);
    });
    done();
  });

  it('Should return status,message and payload when signed in with google',  (done) => {
    chai
    const res = {
      json: (data) => {
        res.body = data;
        return res;
      },
      status: (data) => {
        res.status = data;
        return res;
      },
    };

    const data = new UserControllers().authGoogleLogin(
      {
        user: {
          email: 'yangeney@gmail.com',
          id: 'ancovna',
        },
      },
      res
    )

    .end((err,res)=>{
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
    });
    done()
  });

  it('Should return status,message and payload when signed in with facebook',  (done) => {
    const res = {
      json: (data) => {
        res.body = data;
        return res;
      },
      status: (data) => {
        res.status = data;
        return res;
      },
    };

    const data = new UserControllers().authFacebookLogin(
      {
        user: {
          email: 'yangeney@gmail.com',
          id: 'ancovnalvvs',
        },
      },
      res
    )
  .end((err,res)=>{
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  })
  done()
  });
});
