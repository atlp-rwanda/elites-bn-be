import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import db from '../src/models'

use(chaiHttp);




describe('USER LOGIN', () => {
  it('it should login the user', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'gihozo@gmail.com',
      password: 'Pass@12345'
    });
    
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should not login a user with invalid credentials', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'gih@gmail.com',
      password: 'Pass@12'
    });
    expect(res).to.have.status([403]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    
  });


})

