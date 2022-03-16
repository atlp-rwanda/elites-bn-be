import { expect, request } from 'chai';
import app from '../src/app.js';
import { generateToken } from '../src/helpers/jwtFunction.js';

let token = '';
const bToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQ3MzY1NTQwLCJleHAiOjE2NDc0NTE5NDB9.f_MRlA12fx7nQw7BsEJgY5WZWRAq1Na9s4b28OcWvrE';

before(async () => {
  token = await generateToken({ id: 9 });
});

describe('SHOULD RETURN 200', () => {
  it('it should login', async () => {
    const res = await request(app).post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status([200]);
  });
});

it('it should not login - token blacklisted', async () => {
  const res = await request(app).post('/api/v1/auth/logout')
    .set('Authorization', `Bearer ${bToken}`);
  expect(res).to.have.status([401]);
});
