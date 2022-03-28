import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { token, invalidAccommodation } from './dummyData';

chai.use(chaiHttp);

describe('ACCOMMODATION ROUTES TESTING', () => {
    it('Should retrieve all accommodations', (done) => {
        chai
            .request(app)
            .get(`/api/v1/accommodations`)
            .end((err, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('payload');
            });
        done();
    });

    it('Should not create an accommodation', (done) => {
        chai
            .request(app)
            .post(`/api/v1/accommodations`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidAccommodation)
            .end((err, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('accommodation name is required');
            });
        done();
    });

    it('Should retrieve one accommodation', (done) => {
        chai
            .request(app)
            .get(`/api/v1/accommodations/${1}`)
            .end((err, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('payload');
            });
        done();
    });

    it('Should update accommodation when logged in', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/accommodations/${2}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'This is the updated description' })
            .end((err, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property('message');
            });
        done();
    });

    it('Should not retrieve an accommodation', (done) => {
        chai
            .request(app)
            .get(`/api/v1/accommodations/${'eeee'}`)
            .end((err, res) => {
                expect(res).to.have.status([500]);
                expect(res.body).to.have.property('name');
                expect(res.body.name).to.equal('SequelizeDatabaseError');
                expect(res.body).to.have.property('message');
            });
        done();
    });
});