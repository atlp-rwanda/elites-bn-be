// /* eslint-disable import/extensions */
// /* eslint-disable import/named */
// /* eslint-disable quotes */
// /* eslint-disable import/order */
// /* eslint-disable no-unused-vars */
// /* eslint-disable indent */
// /* eslint-disable no-undef */
// // eslint-disable-next-line import/extensions
// import { TRIP_CREATED, REQUEST_UPDATED } from '../src/constants/tripConstants';
// import chai, { expect, request, use } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../src/app.js';
// import 'dotenv/config';
// import { requeLogin, managerToken } from './trip.dummyData.js';

// let id;

// use(chaiHttp);
// describe('TRIP REQUEST ENDPOINTS', () => {
//   it('it should login the user', async () => {
//     const res = await chai
//       .request(app)
//       .post('/api/v1/users/login')
//       .send(requeLogin)
//       console.log(res.body)
//         expect(res).to.have.status([200]);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('payload');
   
//   });

//   // SHOULD UPDATE THE REQUEST
//   it(' Manager should APPROVE/REJECT pending request', async() => {
//     const res =  await chai
//       .request(app)
//       .patch(`/api/v1/trips/4`)
//       .set('Authorization', `Bearer ${managerToken}`)
//       .send({
//         status: 'approved',
//       })   
//       console.log(res.body, "++++++++=========");
//         expect(res).to.have.status([200]);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('payload');
//         expect(res.body).to.have.property('status');
//   });

//   it(' Manager should not APPROVE/REJECT an already updated trip request', async() => {
//     const res  = await chai
//       .request(app)
//       .patch(`/api/v1/trips/4`)
//       .set('Authorization', `Bearer ${managerToken}`)
//       .send({
//         status: 'approved',
//       })
//         console.log(res.body, "______________________");
//         expect(res).to.have.status([400]);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('status');
  
//   });
// });