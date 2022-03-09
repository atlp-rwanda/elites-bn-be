import chai, { expect, request } from "chai";
import chaiHttp from "chai-http";
import "dotenv/config";
import app from "../src/app";

import { locationData, invalidLocationData } from "./dummyData";

chai.use(chaiHttp);

describe("LOCATION ENDPOINTS TEST", () => {
	it("Should add a location ", () => {
		chai
			.request(app)
			.post(`/api/v1/locations`)
			.send(locationData)
			.end((err, res) => {
				expect(res).to.have.status([201]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("should retrieve all locations in a given country", () => {
		chai
			.request(app)
			.get(`/api/v1/locations/country/${"Rwanda"}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("should get a single location with given ID", () => {
		chai
			.request(app)
			.get(`/api/v1/locations/${1}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("should update a specific location", () => {
		chai
			.request(app)
			.patch(`/api/v1/locations/${3}`)
			.send(locationData)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
			});
	});

	it("should delete a location of a specific accommodation", () => {
		chai
			.request(app)
			.delete(`/api/v1/locations/${4}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
			});
	});
	it("Should not retrieve a location", async () => {
		chai
			.request(app)
			.get(`/api/v1/locations/${"kjoo354"}`)
			.end((err, res) => {
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property("name");
				expect(res.body.name).to.equal("SequelizeDatabaseError");
				expect(res.body).to.have.property("message");
			});
	});
	it("should not update unexisting location", () => {
		chai
			.request(app)
			.patch(`/api/v1/locationss/${3}`)
			.send(invalidLocationData)
			.end((err, res) => {
				expect(res).to.have.status([404]);
				expect(res.body).to.have.property("name");
				expect(res.body.name).to.equal("Not Found");
				expect(res.body).to.have.property("message");
			});
	});
});
