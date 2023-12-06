import app from "../index.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

it("Welcome route works", (done) => {
  chai
    .request(app)
    .get("/")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
      done();
    });
});

it("Cart route works", (done) => {
  chai
    .request(app)
    .get("/api/cart")
    .end((err, res) => {
      res.should.have.status(200);
      res.should.to.be.json;
      done();
    });
});

it("Add to Cart route works", (done) => {
  chai
    .request(app)
    .post("/api/addToCart")
    .send({ 1: 1, 2: 10 })
    .end((err, res, body) => {
      res.should.have.status(200);
      res.should.to.be.json;
      expect(res.body).to.have.property("status");
      done();
    });
});

it("Checkout works", (done) => {
  chai
    .request(app)
    .post("/api/checkout")
    .send({ promocode: "FIRST" })
    .end((err, res, body) => {
      res.should.have.status(200);
      res.should.to.be.json;
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("discount");
      expect(res.body).to.have.property("price");
      expect(res.body).to.have.property("finalAmount");
      expect(res.body).to.have.property("cart");
      done();
    });
});

it("Generate promocode works", (done) => {
  chai
    .request(app)
    .post("/api/generatePromoCode")
    .send({ promocode: "FIRST" })
    .end((err, res, body) => {
      res.should.have.status(200);
      res.should.to.be.json;
      expect(res.body).to.have.property("code");
      expect(res.body).to.have.property("valid");
      done();
    });
});

it("Count of items purchased works", (done) => {
  chai
    .request(app)
    .get("/api/itemsPurchased")
    .end((err, res, body) => {
      res.should.have.status(200);
      res.body.should.to.be.a("array");
      done();
    });
});

it("Total purchase amount works", (done) => {
  chai
    .request(app)
    .get("/api/totalPurchaseAmount")
    .end((err, res, body) => {
      res.should.have.status(200);
      res.should.to.be.json;
      done();
    });
});

it("Total discount amount works", (done) => {
  chai
    .request(app)
    .get("/api/totalDiscountAmount")
    .end((err, res, body) => {
      res.should.have.status(200);
      res.should.to.be.json;
      done();
    });
});

it("List of discount codes works", (done) => {
  chai
    .request(app)
    .get("/api/discountCodes")
    .end((err, res, body) => {
      res.should.have.status(200);
      res.body.should.to.be.a("array");
      done();
    });
});

it("List of orders works", (done) => {
  chai
    .request(app)
    .get("/api/orders")
    .end((err, res, body) => {
      res.should.have.status(200);
      res.body.should.to.be.a("array");
      done();
    });
});
