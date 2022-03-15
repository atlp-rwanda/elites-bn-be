/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable quotes */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  FAILED_TRIP,
  TRIP_FOUND_MESSAGE,
  TRIP_DELETED_MESSAGE,
  NO_TRIP_FOUND,
  ERROR_DATES,
  VALIDATION_ERROR,
} from "../src/constants/tripConstants";
import chai, { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import {
  addRequest,
  incorrectDate,
  updateRequest,
  requesterLogin,
} from "./trip.dummyData.js";

use(chaiHttp);
describe("TRIP REQUEST ENDPOINTS", () => {
  let token;
  let id;

  it("it should login the user", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send(requesterLogin);
    token = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property("status");
    expect(res.body).haveOwnProperty("payload");
  });
  // SHOULD CREATE TRIP FOR REQUESTER

  it("should create a trip request while logged in as requester", (done) => {
    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send(addRequest)
      .end((req, res) => {
        expect(res).to.have.status([201]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("payload");
        expect(res.body).to.have.property("status");
        expect(res.body.message).to.equal(TRIP_CREATED);
        done();
      });
  });

  // SHOULD NOT CREATE A TRIP REQUEST

  it("should  NOT create a trip request", (done) => {
    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send(incorrectDate)
      .end((req, res) => {
        expect(res).to.have.status([400]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.message).to.equal(VALIDATION_ERROR);
        done();
      });
  });

  // SHOULD RETRIEVE ALL REQUESTS BY USER

  it("should retrieve all requests", (done) => {
    chai
      .request(app)
      .get("/api/v1/trips/")
      .set("Authorization", `Bearer ${token}`)
      .end((req, res) => {
        id = res.body.payload[2].id;
        expect(res).to.have.status([200]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("payload");
        expect(res.body).to.have.property("status");
        expect(res.body.message).to.equal(TRIP_FOUND_MESSAGE);
        done();
      });
  });


  // SHOULD NOT RETRIEVE PENDING REQUESTS BY USER

  it("should NOT retrieve pending requests by user", (done) => {
    chai
      .request(app)
      .get("/api/v1/trips/")
      .end((req, res) => {
        expect(res).to.have.status([401]);
        expect(res.type).to.equal("application/json");
        done();
      });
  });

  
  // SHOULD UPDATE THE REQUEST

  it("should UPDATE pending requests by user", (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateRequest)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.message).to.equal(REQUEST_UPDATED);
        done();
      });
  });

  // SHOULD NOT UPDATE

  it("should  NOT UPDATE pending requests by user", (done) => {
    chai
      .request(app)
      .patch("/api/v1/trips/10000")
      .set("Authorization", `Bearer ${token}`)
      .send(updateRequest)
      .end((req, res) => {
        expect(res).to.have.status([404]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");

        done();
      });
  });

  it("should Delete pending requests by user", (done) => {
    chai
      .request(app)
      .delete(`/api/v1/trips/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateRequest)
      .end((req, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.message).to.equal(TRIP_DELETED_MESSAGE);
        done();
      });
  });
});