import chai, { expect, request } from "chai";
import chaiHttp from "chai-http";
import "dotenv/config";
import app from "../src/app";

import { roomData, invalidRoomData } from "./dummyData";

chai.use(chaiHttp);

describe("ROOM ENDPOINTS TEST", () => {
	it("Should add a room ", () => {
		chai
			.request(app)
			.post(`/api/v1/rooms/${2}`)
			.send(roomData)
			.end((err, res) => {
				expect(res).to.have.status([201]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("should retrieve all rooms of an accommodation", () => {
		chai
			.request(app)
			.get(`/api/v1/rooms/accommodation/${1}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("should get a single room in accommodation", () => {
		chai
			.request(app)
			.get(`/api/v1/rooms/${1}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("should update a specific room of an accommodation", () => {
		chai
			.request(app)
			.patch(`/api/v1/rooms/${3}`)
			.send(roomData)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
			});
	});

	it("should delete a room of a specific accommodation", () => {
		chai
			.request(app)
			.delete(`/api/v1/rooms/${2}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
			});
	});
	it("Should not retrieve a room", async () => {
		chai
			.request(app)
			.get(`/api/v1/rooms/${"g354"}`)
			.end((err, res) => {
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property("name");
				expect(res.body.name).to.equal("SequelizeDatabaseError");
				expect(res.body).to.have.property("message");
			});
	});
	it("should not update a room with wrong data format", () => {
		chai
			.request(app)
			.patch(`/api/v1/rooms/${3}`)
			.send(invalidRoomData)
			.end((err, res) => {
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property("name");
				expect(res.body.name).to.equal("SequelizeDatabaseError");
				expect(res.body).to.have.property("message");
			});
	});
});
