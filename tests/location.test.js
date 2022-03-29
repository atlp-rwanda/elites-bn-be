import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { locationData, token } from './dummyData';

chai.use(chaiHttp);

describe('LOCATION ENDPOINTS TEST', () => {
  it('Should add a location ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/locations`)
      .set('Authorization', `Bearer ${token}`)
      .send(locationData)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
      });
    done();
  });

  it('should get a single location with given ID', (done) => {
    chai
      .request(app)
<<<<<<< HEAD
      .get(`/api/v1/locations/1`)
=======
      .get(`/api/v1/locations/${1}`)
>>>>>>> 3fa91f6 ( This is a combination of 2 commits.)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
      });
    done();
  });

  it('should update a specific location', (done) => {
    chai
      .request(app)
<<<<<<< HEAD
      .patch(`/api/v1/locations/3`)
=======
      .patch(`/api/v1/locations/${3}`)
>>>>>>> 3fa91f6 ( This is a combination of 2 commits.)
      .set('Authorization', `Bearer ${token}`)
      .send(locationData)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
      });
    done();
  });

  it('should delete a location of a specific accommodation', (done) => {
    chai
      .request(app)
<<<<<<< HEAD
      .delete(`/api/v1/locations/4`)
=======
      .delete(`/api/v1/locations/${4}`)
>>>>>>> 3fa91f6 ( This is a combination of 2 commits.)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.body).to.have.property('message');
      });
    done();
  });
  it('Should not retrieve a location', (done) => {
    chai
      .request(app)
<<<<<<< HEAD
      .get(`/api/v1/locations/kjoo354`)
=======
      .get(`/api/v1/locations/${'kjoo354'}`)
>>>>>>> 3fa91f6 ( This is a combination of 2 commits.)
      .end((err, res) => {
        expect(res).to.have.status([500]);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('SequelizeDatabaseError');
        expect(res.body).to.have.property('message');
      });
    done();
  });
<<<<<<< HEAD
  it('should not update location when not travel admin', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/locations/5`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'test description' })
      .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('message');
        expect(res.body.name).to.equal('You are not a travel admin');
      });
    done();
=======
  it('should not update unexisting location', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/locationss/${3}`)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidLocationData)
      .end((err, res) => {
        expect(res).to.have.status([404]);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Not Found');
        expect(res.body).to.have.property('message');
        done();
      });
>>>>>>> 3fa91f6 ( This is a combination of 2 commits.)
  });
});
