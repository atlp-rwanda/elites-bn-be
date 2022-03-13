import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';


use(chaiHttp);

describe('USER REGISTER A USER', () => {
    it('it should register the user', async () => {
      const res = await request(app).post('/api/v1/users/register').send({
        email: 'giho13@gmail.com',
        password: 'Pass@12515858'
      })
      expect(res).to.have.status([201]);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('status');
      expect(res.body).haveOwnProperty('payload');
    });
  
    it('it should not register a user with existing email ', async () => {
      const res = await request(app).post('/api/v1/users/register').send({
        email: 'gihoz0@gmail.com',
        password: 'Pass@12345'
      });
      expect(res).to.have.status([409]);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('status');
      
    });
})