import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'


use(chaiHttp);

describe('ROLE END-POINT TESTING', () => {
  describe('UPDATE ROLE USER TESTS', () => {
    it('should assign a role to a user', async () => {
        // let id = 4;
      const res = await request(app).patch('/api/v1/users/updateRole/4')
        .send({
          email: 'seeduser@gmail.com',
        });
        expect(res).to.have.status([200]);
        // expect(res.body).to.have.roleId(4)
     
    });

    it("should not assign a role to a user if role doesn't exist", async () => {
        let id = 10;
      const res = await request(app)
        .patch('/api/v1/users/updateRole/9')
        .send({
            email: 'seeduser@gmail.com',
           
        });

        expect(res).to.have.status([400]);
    });

    it("should not assign a role a user if email doesn't exist", async () => {
        let id = 4;
      const res = await request(app)
        .patch('/api/v1/users/updateRole/4')
        .send({
            email: 'seedusgmail.com',
           
        });

        expect(res).to.have.status([400]);
    });

    
  });
});