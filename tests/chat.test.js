import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

chai.use(chaiHttp);

describe('SHOULD RETRIEVE CHATS', () => {
  it('Should fetch all chats ', async () => {
    const res =  await chai
      .request(app)
      .get(`/api/v1/chats`)
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('chats');
  });
});
