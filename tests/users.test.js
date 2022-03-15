import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import db from '../src/models'

use(chaiHttp);




describe('USER LOGIN', () => {
  it('it should login the user', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'yangeney@gmail.com',
      password: 'password'
    });
    console.log(res)
    
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
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    
  });


})

