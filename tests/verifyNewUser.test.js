// import chai, { expect, request, use } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../src/app.js';
// import 'dotenv/config';

// chai.use(chaiHttp);
// let token;
// describe('verifying a user who is registered ', () => {
//   it('it should register a user.', async () => {
//     const res = await chai.request(app).post('/api/v1/users/login').send({
//       names: 'Kalisa Claude',
//       email: 'kalisa@gmail.com',
//       password: 'Password123',
//     });
//     token = res.body.payload.accesstoken;
//     expect(res).to.have.status([200]);
//     expect(res.body).to.have.property('message');
//     expect(res.body).to.have.property('status');
//     expect(res.body).haveOwnProperty('payload');
//   });

//   it('should verify a registered user ', async () => {
//     const res = await chai
//       .request(app)
//       .post(`/api/v1/users/verifyEmail/${token}`)
//       .send({
//         token,
//       });
//     expect(res).to.have.status([404]);
//     expect(res.body).to.eql({});
//   });
// });
