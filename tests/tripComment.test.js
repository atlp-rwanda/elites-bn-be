import chai, { expect, request, use } from 'chai';
import app from '../src/app.js';
import chaiHttp from 'chai-http';
import { token, invalidAccommodation, accessTokenRequester } from './dummyData';

use(chaiHttp);

describe('TRIP COMMENT TESTING', () => {
    it('It should get all comment', async() => {
        const res = await request(app)
            .get('/api/v1/trip/5/comments')
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status([200]);
    });

    it('It should not create a comment', async() => {
        const res = await request(app)
            .post('/api/v1/trip/5/comments')
            .set('Authorization', `Bearer ${accessTokenRequester}`)
            .send({
                comment: 'Test Comment',
            });
        expect(res).to.have.status([201]);
    });

    it('It should not delete a comment', async() => {
        const res = await request(app).delete('/api/v1/comments/1');
        expect(res).to.have.status([401]);
    });
});