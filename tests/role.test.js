import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'


use(chaiHttp);

describe('ROLE END-POINT TESTING', () => {
  describe('UPDATE ROLE USER TESTS', () => {
    it('should assign a role to a user', async () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3NTA0MzY0LCJleHAiOjE2NDc1OTA3NjR9.1RzSrOzZaM6Ii19eSMkIAiBxEoQagVXAkuokE9zZ-As'
      const res = await request(app).patch('/api/v1/users/updateRole/4')
        .send({
          email: 'seeduser@gmail.com',
        })
        .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status([200]);
      
     
    });

    it("should not assign a role to a user if role doesn't exist", async () => {
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3NTA0MzY0LCJleHAiOjE2NDc1OTA3NjR9.1RzSrOzZaM6Ii19eSMkIAiBxEoQagVXAkuokE9zZ-As'
      const res = await request(app)
        .patch('/api/v1/users/updateRole/9')
        .send({
            email: 'seeduser@gmail.com',
           
        }).set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status([400]);
    });

    it("should not assign a role a user if email doesn't exist", async () => {
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3NTA0MzY0LCJleHAiOjE2NDc1OTA3NjR9.1RzSrOzZaM6Ii19eSMkIAiBxEoQagVXAkuokE9zZ-As'
      const res = await request(app)
        .patch('/api/v1/users/updateRole/4')
        .send({
            email: 'seedusgmail.com',
           
        }).set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status([400]);
    });

    
  });
});