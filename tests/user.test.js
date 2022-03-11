
// import { expect, request, use } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../src/app.js'


// use(chaiHttp);

// describe('USER END-POINT TESTING', () => {
//   describe('REGISTER USER TESTS', () => {
//     it('should register a user', async () => {
//       const res = await request(app).post('/api/v1/users/register')
//         .send({
//             names:'Diallo',
//           email: 'diallopeeg@gmail.com',
//           password:'diallo'
//         });
    
//         expect(res).to.have.status([201]);
      
     
//     });
    
    
//   });
// });

import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'


use(chaiHttp);

describe('USER END-POINT TESTING', () => {
  describe('REGISTER USER TESTS', () => {
    it('should register a user', async () => {
      const res = await request(app).post('/api/v1/users/register')
        .send({
            names:'Diallo',
          email: 'diallopeg@gmail.com',
          password:'diallo'
        });
    
        expect(res).to.have.status([201]);
      
     
    });
    it('should not register a user when already existing', async () => {
        const res = await request(app).post('/api/v1/users/register')
        
          .send({
              names:'seeduser',
            email: 'seeduser@gmail.com',
            password:'seeduser'
          });
          expect(res).to.have.status([409]);
          
       
      });
    
  });

})
