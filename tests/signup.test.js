// import { expect, request, use, chai } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../src/app.js';
// import 'dotenv/config';
// import sinon from 'sinon';

// use(chaiHttp);

//     describe('USER REGISTER A USER', () => {
//       it('it should register the user', async () => {
//         const res = await request(app).post('/api/v1/users/register').send({
//           names:"kamanzi",
//           email: 'kamanzi@gmail.com',
//           password: 'Pass@12345'
//         })
//         expect(res).to.have.status([201]);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('status');
//         expect(res.body).haveOwnProperty('payload');
//       });

//      it('should not register a user with invalid address (url)', async () => {
//         const res = await request(app)
//           .post('/api/v1/users/registerssss')
//           .send({
//               names:"amani",
//               email: 'sa23415@example.com',
//               password:'password@1223'

//           });
//           expect(res).to.have.status([404]);
//           expect(res.type).to.equal('application/json');

//       });

//       it('should not register a user if exist', async () => {
//         const res = await request(app).post('/api/v1/users/register').send({
//           names:'Alice Musayidire',
//           email: 'kaalicy@gmail.com',
//           password: 'password@123'
//         });

//         expect(res).to.have.status([400]);
//         expect(res.type).to.equal('application/json');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('User with this email exist.');

//       });

//     describe('USER REGISTER A USER',()=>{
//        it('creates a user',()=>{
//          const save = sinon.spy();
//          let names;
//          let email;
//          let password;

//          const MockModel =  (data)=>{
//              names = data.names,
//              email = data.email,
//              password = data.password;

//              return{
//                ...data,
//                save
//              };
//          }
//        })
//      })

//     })
