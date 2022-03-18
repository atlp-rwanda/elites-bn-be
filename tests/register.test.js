import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import models from '../src/models';
use(chaiHttp);

describe('USER REGISTER A USER', () => {

  before(async ()=>{
    await models.User.destroy({where:{email:'elites@gmail.com'}})
 })
    it('it should register the user', async () => {
      const res = await request(app).post('/api/v1/users/register').send({
<<<<<<< HEAD
<<<<<<< HEAD
        email: 'elites@gmail.com',
        password: 'Pass12515858'
=======
        names:"MAGNUS",
        email: 'LeGrand@gmail.com',
        password: 'Pass@125'
>>>>>>> ec439fb (updated fb and google login)
=======
        names:"MAGNUS",
        email: 'LeGrand@gmail.com',
        password: 'Pass@125'
>>>>>>> 1d72b6059294ac6e527c87f96fafc90244696c8b
      })
      expect(res).to.have.status([200]);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('status');
      expect(res.body).haveOwnProperty('payload');
    });
<<<<<<< HEAD

    it('should not register a user when already existing', async () => {
      const res = await request(app).post('/api/v1/users/register')
=======
  
    it('it should not register a user with existing email ', async () => {
      const res = await request(app).post('/api/v1/users/register').send({
        names:'YANGENEYE Patrick',
        email: 'yangeney@gmail.com',
        password: 'password'
      });
    
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('statusCode');
<<<<<<< HEAD
>>>>>>> ec439fb (updated fb and google login)
=======
>>>>>>> 1d72b6059294ac6e527c87f96fafc90244696c8b
      
        .send({
          names: 'Gihozo Innocente',
          email: 'gihozo97@gmail.com',
          password:'Gihozo12345'
        });
      
        expect(res).to.have.status([409]);
        
     
    });
  
  
})