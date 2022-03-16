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
        email: 'elites@gmail.com',
        password: 'Pass12515858'
      })
      expect(res).to.have.status([200]);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('status');
      expect(res.body).haveOwnProperty('payload');
    });
  
  
})