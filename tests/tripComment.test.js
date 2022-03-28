import chai, { expect, request, use } from 'chai';
import app from '../src/app.js';
import chaiHttp from 'chai-http';

use(chaiHttp);

describe('TRIP COMMENT TESTING', () => {
    let token;
    let id;

    it('it should login the user', async() => {
        const res = await chai.request(app).post('/api/v1/users/login').send({
            email: 'senderthree@gmail.com',
            password: 'pass123@',
        });
        token = await res.body.payload.accesstoken;
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).haveOwnProperty('payload');
    });

    it('It should get all comment', async() => {
        const res = await request(app)
            .get('/api/v1/trip/3/comments')
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status([200]);
    });

    it('It should not create a comment', async() => {
        const res = await request(app).post('/api/v1/trip/3/comments').send({
            comment: 'Test Comment',
        });
        expect(res).to.have.status([401]);
    });

    it('It should not delete a comment', async() => {
        const res = await request(app).delete('/api/v1/comments/1');
        expect(res).to.have.status([401]);
    });
});