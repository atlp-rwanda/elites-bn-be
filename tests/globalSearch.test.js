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
    requeLogin,
    managerLogins,
    requesterToken,
    managerToken,
  } from "./trip.dummyData.js";
  
  let id;
  
  use(chaiHttp);

  describe("GLOBAL SEARCH FUNCTIONALITY ENDPOINTS BY A USER", () => {
    it("it should login a user", (done) => {
      chai
        .request(app)
        .post("/api/v1/users/login")
        .send(requeLogin)
  
        .end((err, res) => {
  
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("payload");
        })
      done();
    });
  
    // SHOULD UPDATE THE REQUEST
    it(' A user should be able to use global search and retrieve data from database with related status approved', (done) => {
      chai
        .request(app)
        .get(`/api/v1/trips?status="approved"`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .end((err, res) => {
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body.message).to.equal(REQUEST_UPDATED);
        });
      done();
    });

     
     it(' A user should be able to use global search and retrieve data from database with related status rejected', (done) => {
      chai
        .request(app)
        .get(`/api/v1/trips?status="rejected"`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .end((err, res) => {
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body.message).to.equal(REQUEST_UPDATED);
        });
      done();
    });
    it(' A user should be able to use global search and retrieve data from database according to arrival Location', (done) => {
        chai
          .request(app)
          .get(`/api/v1/trips?arrivalLocation=3`)
          .set('Authorization', `Bearer ${requesterToken}`)
          .end((err, res) => {
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
          });
        done();
      });

      it(' A user should be able to use global search and retrieve data from database according to manager ID', (done) => {
        chai
          .request(app)
          .get(`/api/v1/trips?managerId=3`)
          .set('Authorization', `Bearer ${requesterToken}`)
          .end((err, res) => {
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
          });
        done();
      });

      it(' A user should be able to use global search and retrieve data from database according to Departure Location', (done) => {
        chai
          .request(app)
          .get(`/api/v1/trips?departLocation=2`)
          .set('Authorization', `Bearer ${requesterToken}`)
          .end((err, res) => {
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
          });
        done();
      });

      it(' A user should be able to use global search and retrieve data from database according to trip reason', (done) => {
        chai
          .request(app)
          .get(`/api/v1/trips?tripReason="this is to test "`)
          .set('Authorization', `Bearer ${requesterToken}`)
          .end((err, res) => {
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
          });
        done();
      });
  });
  


  describe("GLOBAL SEARCH FUNCTIONALITY ENDPOINTS BY MANAGER", () => {
    it("it should login a manager", (done) => {
      chai
        .request(app)
        .post("/api/v1/users/login")
        .send(managerLogins)
        .end((err, res) => {
  
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("payload");
        })
      done();
    });
  
    // SHOULD UPDATE THE REQUEST
    it(' A manager should be able to use global search and retrieve data from database with related status approved', (done) => {
      chai
        .request(app)
        .get(`/api/v1/trips?status="approved"`)
        .set('Authorization', `Bearer ${managerToken}`)
        .end((err, res) => {
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body.message).to.equal(REQUEST_UPDATED);
        });
      done();
    });

    it(' A manager should be able to use global search and retrieve data from database with related status rejected', (done) => {
        chai
          .request(app)
          .get(`/api/v1/trips?status="rejected"`)
          .set('Authorization', `Bearer ${managerToken}`)
          .end((err, res) => {
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
          });
        done();
      });
})