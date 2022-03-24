import chai, { expect, use, request } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import { accommodationData, invalidAccommodation } from "./dummyData";

chai.use(chaiHttp);

describe("ACCOMMODATION ROUTES TESTING", () => {
	it("Should retrieve all accommodations", () => {
		chai
			.request(app)
			.get(`/api/v1/accommodations`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("Should not create an accommodation", () => {
		chai
			.request(app)
			.post(`/api/v1/accommodations`)
			.send(invalidAccommodation)
			.end((err, res) => {
				expect(res).to.have.status([401]);
			});
	});

	it("Should retrieve one accommodation", async () => {
		chai
			.request(app)
			.get(`/api/v1/accommodations/${1}`)
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
				expect(res.body).to.have.property("payload");
			});
	});

	it("Should update accommodation", async () => {
		chai
			.request(app)
			.patch(`/api/v1/accommodations/${2}`)
			.send({ description: "This is the updated description" })
			.end((err, res) => {
				expect(res).to.have.status([200]);
				expect(res.body).to.have.property("message");
			});
	});

	it("Should not retrieve an accommodation", async () => {
		chai
			.request(app)
			.get(`/api/v1/accommodations/${"eeee"}`)
			.end((err, res) => {
				expect(res).to.have.status([500]);
				expect(res.body).to.have.property("name");
				expect(res.body.name).to.equal("SequelizeDatabaseError");
				expect(res.body).to.have.property("message");
			});
	});
});
