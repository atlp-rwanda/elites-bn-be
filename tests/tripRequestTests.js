import { TRIP_CREATED, REQUEST_UPDATED } from '../src/constants/tripConstants.js';
import chai, { expect, request, use } from 'chai';
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import { addRequest, incorrectDate, updateRequest } from "./trip.dummyData.js";

use(chaiHttp);
describe('TRIP REQUEST ENDPOINTS', () => {
    it("should create a trip request", (done) => {
        chai
            .request(app)
            .post("/api/v1/trip/request/2")
            .send(addRequest)
            .end((req, res) => {
                expect(res).to.have.status([201]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("payload");
                expect(res.body).to.have.property("status");
                expect(res.body.message).to.equal(TRIP_CREATED);
                done();
            });
    });

    //SHOULD NOT CREATE A TRIP REQUEST 

    it("should  NOT create a trip request", (done) => {
        chai
            .request(app)
            .post("/api/v1/trip/request/2")
            .send(incorrectDate)
            .end((req, res) => {
                expect(res).to.have.status([400]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");
                expect(res.body.message).to.equal("departure date is greater than return date");
                done();
            });
    });

    // SHOULD RETRIEVE ALL REQUESTS BY USER

    it("should retrieve all requests", (done) => {
        chai
            .request(app)
            .get("/api/v1/trip/allrequest/1")
            .end((req, res) => {
                expect(res).to.have.status([200]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("payload");
                expect(res.body).to.have.property("status");
                expect(res.body.message).to.equal(TRIP_CREATED);
                done();
            });
    });

    // SHOULD RETRIEVE PENDING REQUESTS BY USER 

    it("should retrieve all requests", (done) => {
        chai
            .request(app)
            .get("/api/v1/trip/requests/1")
            .end((req, res) => {
                expect(res).to.have.status([200]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("payload");
                expect(res.body).to.have.property("status");
                expect(res.body.message).to.equal(TRIP_CREATED);
                done();
            });
    });


    // SHOULD NOT RETRIEVE PENDING REQUESTS BY USER 

    it("should NOT retrieve all pending requests by user", (done) => {
        chai
            .request(app)
            .get("/api/v1/trip/requests/5h")
            .end((req, res) => {
                expect(res).to.have.status([500]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");
                expect(res.body.message).to.equal("NOT FOUND");
                done();
            });
    });

    // SHOULD UPDATE THE REQUEST

    it("should UPDATE pending requests by user", (done) => {
        chai
            .request(app)
            .patch("/api/v1/trip/request/1/14")
            .send(updateRequest)
            .end((req, res) => {
                expect(res).to.have.status([200]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");
                expect(res.body.message).to.equal(REQUEST_UPDATED);
                done();
            });
    });

    //SOULD NOT UPDATE

    it("should  NOT UPDATE pending requests by user", (done) => {
        chai
            .request(app)
            .patch("/api/v1/trip/request/1/100000000000000000000000000000000009")
            .send(updateRequest)
            .end((req, res) => {
                expect(res).to.have.status([500]);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");

                done();
            });
    });
});