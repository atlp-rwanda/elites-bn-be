import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import db from '../src/models';
import { UserControllers } from '../src/controllers/userController';

use(chaiHttp);

describe('AUTHORIZED USER LOGIN', () => {
  it('it should login the user through google', async () => {
    const res = await request(app).get('/api/v1/users/auth/google').send({});
    expect(res).to.have.status([200]);
  });

  it('Should return status,message and payload when signed in with google', async () => {
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

    const data = await new UserControllers().authGoogleLogin(
      {
        user: {
          email: 'yangeney@gmail.com',
          id: 'ancovna',
        },
      },
      res
    );

    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('Should return status,message and payload when signed in with facebook', async () => {
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

    const data = await new UserControllers().authFacebookLogin(
      {
        user: {
          email: 'yangeney@gmail.com',
          id: 'ancovnalvvs',
        },
      },
      res
    );

    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });
});
