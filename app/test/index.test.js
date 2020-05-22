const mocha = require("mocha");
const chai = require("chai");

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

const url = `http://localhost:8085`;
const request = require("supertest");

const app = require("../index.js");

const gqlQuery = `
  query {
    message
  }
`;

describe("Can fetch the test endpoint /graphql", () => {
  it("Can get the 'Hello World' message response", (done) => {
    request(app)
      .post("/graphql")
      .send({ query: gqlQuery })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("message").to.be.a("string");
        expect(res.body.data.message)
          .to.be.a("string")
          .to.be.equal("Hello World!");
        done();
      });
  });

  after((done) => {
    app.close(done);
  });
});
