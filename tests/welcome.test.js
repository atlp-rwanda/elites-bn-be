import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";

use(chaiHttp);

describe("WELCOME END-POINT-TEST", () => {
  it("should display welcome ", (done) => {
    chai
      .request(app)
      .get("/api/v1/")
      .send()
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });

  it("should not display welcome", () => {
    chai
      .request(app)
      .get("/api/v1/welcomeagain")
      .send()
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
      });
  });
});
