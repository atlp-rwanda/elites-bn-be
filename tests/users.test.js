import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import db from '../src/models'

use(chaiHttp);

chai.use(chaiHttp)

describe('USER LOGIN', () => {
  it('it should login the user', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'gihozo97@gmail.com',
       password: 'Pass12345678'
    });
    
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });

  it('it should not login a user with invalid credentials', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'gih@gmail.com',
      password: 'Pass@12'
    });
    expect(res).to.have.status([401]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('statusCode');
    
  });

})



describe('USER CREATE AN ARTICLE', () => {
  let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZXMiOiJHaWhvem8gSW5ub2NlbnRlIiwiZW1haWwiOiJnaWhvem85N0BnbWFpbC5jb20iLCJyb2xlSWQiOm51bGwsIm1hbmFnZXJJZCI6bnVsbCwiaXNBY3RpdmUiOm51bGwsInZlcmlmaWVkIjpudWxsLCJSb2xlLmlkIjpudWxsLCJSb2xlLm5hbWUiOm51bGwsImlhdCI6MTY0NzM1NTU3NywiZXhwIjoxNjQ3NDQxOTc3fQ.e9YfoCflGuDrsWZvQDd3xI5Rp-v0g0l8Ao43Hz5fMuY";
  
  it("When logged in Should post the Articles",(done) => {
    chai
    .request(app)
    .post("/api/v1/users/article/")
    .set('Authorization', `Bearer ${token}`)
    
    .end((req,res)=>{
        expect(res).to.have.status([200])
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status')
        expect(res.body).haveOwnProperty('payload');
      done()
    })
})
})




describe('USING REFRESH TOKEN TO CREATE AN ACCESS TOKEN', () => {
  it('Should create access token using refresh token', async () => {
    const res = await request(app).post('/api/v1/users/refreshtoken').send({
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZXMiOiJHaWhvem8gSW5ub2NlbnRlIiwiZW1haWwiOiJnaWhvem9AZ21haWwuY29tIiwicm9sZUlkIjo1LCJtYW5hZ2VySWQiOm51bGwsImlzQWN0aXZlIjpudWxsLCJ2ZXJpZmllZCI6bnVsbCwiUm9sZS5pZCI6NSwiUm9sZS5uYW1lIjoicmVxdWVzdGVyIiwiaWF0IjoxNjQ3MjM1ODgwLCJleHAiOjE2NDc4NDA2ODB9.BEC7DcDxZzIO5P216giaJcV-k7lVfuW_EUEev_gS3sQ"
    });
    
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).haveOwnProperty('payload');
  });


  it('Should not create access token from refresh token', async () => {
    const res = await request(app).post('/api/v1/users/refreshtoken').send({
      "refreshToken": "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZXMiOiJHaWhvem8gSW5ub2NlbnRlIiwiZW1haWwiOiJnaWhvem9AZ21haWwuY29tIiwicm9sZUlkIjo1LCJtYW5hZ2VySWQiOm51bGwsImlzQWN0aXZlIjpudWxsLCJ2ZXJpZmllZCI6bnVsbCwiUm9sZS5pZCI6NSwiUm9sZS5uYW1lIjoicmVxdWVzdGVyIiwiaWF0IjoxNjQ3MjM1ODgwLCJleHAiOjE2NDc4NDA2ODB9.BEC7DcDxZzIO5P216giaJcV-k7lVfuW_EUEev_gS3sQ"
    });
    
    expect(res).to.have.status([500]);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('statusCode');
  });
})