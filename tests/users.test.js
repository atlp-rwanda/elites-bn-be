import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import { generateToken } from '../src/helpers/jwtFunction';
// import user from '../src/models/user.js';
// import userData from './dummyData.js';
import db from '../src/models'

use(chaiHttp);




describe('USER LOGIN', () => {
  it('it should login the user', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'gihozo@gmail.com',
      password: 'Pass@12345'
    });
    // console.log(res)
    
    expect(res).to.have.status([201]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should not login a user with invalid credentials', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'gihoz@gmail.com',
      password: 'Pass@12345'
    });
    expect(res).to.have.status([403]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    
  });


})




// describe('LOGIN END-POINTS TESTING', () => {
//     it('Should login a user', async () => {
//       const res = await request(app).post('/api/v1/users/login');
//       expect(res).to.have.status([201]);
//       expect(res.type).to.equal('application/json');
//       expect(res.body).to.have.property('message');
//       expect(res.body).to.have.property('status');
//       expect(res.body.message).to.equal('User logged in successfully.');
//       expect(res.body.status).to.equal(201);
//     });

//     it('Should not login a user', async () => {
//         const res = await request(app).post('/api/v1/users/login');
//         expect(res).to.have.status([403]);
//         expect(res.type).to.equal('application/json');
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('status');
//         expect(res.body.message).to.equal('Invalid credentials.');
//         expect(res.body.status).to.equal(403);
//       });
// });