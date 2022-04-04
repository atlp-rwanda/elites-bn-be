import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { token, invalidAccommodation, accessTokenRequester } from './dummyData';

chai.use(chaiHttp);

describe('ACCOMMODATION RATING ROUTES TESTING', () => {
    it('Should retrieve all accommodations rating', (done) => {
        chai
            .request(app)
            .get(`/api/v1/accommodations/1/reviews`)
            .end((err, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('payload');
            });
        done();
    });

    it('Should create an accommodation rating', (done) => {
        chai
            .request(app)
            .post(`/api/v1/accommodations/1/reviews`)
            .set('Authorization', `Bearer ${accessTokenRequester}`)
            .send({
                rating: 5,
                feedback: 'Feedback Test',
            })
            .end((err, res) => {
                expect(res).to.have.status([201]);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('payload');
            });
        done();
    });

    it('Should not create an accommodation rating', (done) => {
        chai
            .request(app)
            .post(`/api/v1/accommodations/1/reviews`)
            .set('Authorization', `Bearer ${accessTokenRequester}`)
            .send({
                rating: 6,
                feedback: 'Feedback Test',
            })
            .end((err, res) => {
                expect(res).to.have.status([500]);
                expect(res.body).to.have.property('message');
            });
        done();
    });
});