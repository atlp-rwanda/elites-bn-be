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
    managerToken,
    senderFour,
  } from "./trip.dummyData.js";
  
  let id;
  
  use(chaiHttp);

  describe("GLOBAL SEARCH FUNCTIONALITY ENDPOINTS BY A USER", () => {

  let requesterToken;
    it("it should login a user", async() => {
      const res = await chai
        .request(app)
        .post("/api/v1/users/login")
        .send(senderFour )
        requesterToken = res.body.payload.accesstoken
        expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("payload");
    });
  
    // SHOULD UPDATE THE REQUEST
    it(' A user should be able to use global search and retrieve data from database with related status approved', async() => {

      const res = await chai
        .request(app)
        .get(`/api/v1/trips?status="approved"`)
        .set('Authorization', `Bearer ${requesterToken}`)
        console.log(res.body,'use global search==========================')
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
    });

     
     it(' A user should be able to use global search and retrieve data from database with related status rejected', async() => {
       const res = await chai
        .request(app)
        .get(`/api/v1/trips?status="rejected"`)
        .set('Authorization', `Bearer ${requesterToken}`)
        console.log(res.body,'use global search and retrieve ==========================')
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body.message).to.equal(REQUEST_UPDATED);
    });

    it(' A user should be able to use global search and retrieve data from database according to arrival Location', async() => {
      const res = await chai
          .request(app)
          .get(`/api/v1/trips?arrivalLocation=3`)
          .set('Authorization', `Bearer ${requesterToken}`)
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
      });

      it(' A user should be able to use global search and retrieve data from database according to manager ID', async() => {
        const res =  await chai
          .request(app)
          .get(`/api/v1/trips?managerId=8`)
          .set('Authorization', `Bearer ${requesterToken}`)
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
      });

      it(' A user should be able to use global search and retrieve data from database according to Departure Location', async() => {
        const res =  await chai
          .request(app)
          .get(`/api/v1/trips?departLocation=2`)
          .set('Authorization', `Bearer ${requesterToken}`)
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
      });

      it(' A user should be able to use global search and retrieve data from database according to trip reason', async() => {
        const res = await chai
          .request(app)
          .get(`/api/v1/trips?tripReason="this is to test "`)
          .set('Authorization', `Bearer ${requesterToken}`)
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
      });
  });
  


  describe.only("GLOBAL SEARCH FUNCTIONALITY ENDPOINTS BY MANAGER", () => {
    it("it should login a manager", async() => {
      const res = await chai
        .request(app)
        .post("/api/v1/users/login")
        .send(managerLogins)
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("payload");
    });
  
    // SHOULD UPDATE THE REQUEST
    it(' A manager should be able to use global search and retrieve data from database with related status approved', async() => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trips?status="approved"`)
        .set('Authorization', `Bearer ${managerToken}`)
          expect(res).to.have.status([200]);
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("status");
          expect(res.body.message).to.equal(REQUEST_UPDATED);
    });

    it(' A manager should be able to use global search and retrieve data from database with related status rejected', async() => {
      const res = await chai
          .request(app)
          .get(`/api/v1/trips?status="rejected"`)
          .set('Authorization', `Bearer ${managerToken}`)
            expect(res).to.have.status([200]);
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.message).to.equal(REQUEST_UPDATED);
      });
})