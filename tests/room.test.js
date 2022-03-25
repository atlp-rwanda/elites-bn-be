import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

import { roomData, invalidRoomData, token } from './dummyData';

chai.use(chaiHttp);

describe('ROOM ENDPOINTS TEST', () => {
	it('Should add a room ', (done) => {
		chai
			.request(app)
			.post(`/api/v1/rooms`)
			.set('Authorization', `Bearer ${token}`)
			.send(roomData)
			.end((err, res) => {
				expect(res).to.have.status([201]);
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('payload');
			});
		done();
	});

	it('should retrieve all rooms of an accommodation', (done) => {
		chai
			.request(app)
			.get(`/api/v1/accommodations/${1}/rooms`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('payload');
			});
		done();
	});

	it('should get a single room in accommodation', (done) => {
		chai
			.request(app)
			.get(`/api/v1/rooms/${1}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('payload');
			});
		done();
	});

	it('should update a specific room of an accommodation', (done) => {
		chai
			.request(app)
			.patch(`/api/v1/rooms/${3}`)
			.set('Authorization', `Bearer ${token}`)
			.send(roomData)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property('message');
			});
		done();
	});

	it('should delete a room of a specific accommodation', (done) => {
		chai
			.request(app)
			.delete(`/api/v1/rooms/${2}`)
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property('message');
			});
		done();
	});
	it('Should not retrieve a room', (done) => {
		chai
			.request(app)
			.get(`/api/v1/rooms/${'g354'}`)
			.end((err, res) => {
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property('name');
				expect(res.body.name).to.equal('SequelizeDatabaseError');
				expect(res.body).to.have.property('message');
			});
		done();
	});
	it('should not update a room with wrong data format', (done) => {
		chai
			.request(app)
			.patch(`/api/v1/rooms/${3}`)
			.set('Authorization', `Bearer ${token}`)
			.send(invalidRoomData)
			.end((err, res) => {
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property('name');
				expect(res.body.name).to.equal('SequelizeDatabaseError');
				expect(res.body).to.have.property('message');
			});
		done();
	});
});
