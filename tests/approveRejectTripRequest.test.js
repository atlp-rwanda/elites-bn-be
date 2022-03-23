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
} from "../src/constants/tripConstants";
import chai, { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import {
  tripRequest,
  requesterLogin,
  managerLogin,
} from "./trip.dummyData.js";

let id;

use(chaiHttp);
describe("TRIP REQUEST ENDPOINTS", () => {
  let requesterToken;
  let managerToken;

  before("should retrieve a trip requests", (done) => {
    chai
      .request(app)
      .get("/api/v1/trips/4")
      .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQ4MjE1ODEwLCJleHAiOjE2NDgzMDIyMTB9.8H_A_AWghtiK-g_cczotsJahXHHEhlZTxX6AlhY0dMY`)
      .end((req, res) => {
        id = res.body.payload.id;
        done();
      });
  });

  it("it should login the user", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send(requesterLogin);
    requesterToken = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property("status");
    expect(res.body).haveOwnProperty("payload");
  });

  it("it should login the manager", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send(managerLogin);
    managerToken = res.body.payload.accesstoken;
    expect(res).to.have.status([200]);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property("status");
    expect(res.body).haveOwnProperty("payload");
  });

  // SHOULD UPDATE THE REQUEST

  it(' Manager should APPROVE/REJECT pending request', (done) => {
    chai
      .request(app)
      .put(`/api/v1/trips/${id}}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        status: 'approved',
      })
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res.type).to.equal("application/json");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("status");
        expect(res.body.message).to.equal(REQUEST_UPDATED);
      });
    done();
  });
});
