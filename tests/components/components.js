import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

var idRecipe = "idRecipeTest";
var idRating = "";
var idUser = "testUser";
var comment = "test_comment";
var like = true;
let ratingPOST = {
  idUser: idUser,
  idRecipe: idRecipe,
  like: like,
  comment: comment,
};
let ratingPUT = {
  idUser: idUser,
  idRecipe: idRecipe,
  like: false,
  comment: "edited",
};

const apiURL = "http://localhost:8080";

describe("/GET ratings", () => {
  before(() => {
    // Wait for the service to start
    let delay = new Promise((resolve) => setTimeout(resolve, 3000));
    return delay;
  });
  it("should GET all ratings", (done) => {
    chai
      .request(apiURL)
      .get("/api/v1/ratings")
      .end((err, res) => {
        res.body.should.be.a("array");
        res.should.have.status(200);
        chai.expect(res.body).to.have.length.greaterThan(0);
        done();
      });
  });
});

describe("POST rating", () => {
  before(() => {
    // Wait for the service to start
    let delay = new Promise((resolve) => setTimeout(resolve, 3000));
    return delay;
  });

  it("should post a rating", (done) => {
    chai
      .request(apiURL)
      .post("/api/v1/ratings")
      .send(ratingPOST)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("idUser");
        res.body.should.have.property("idRecipe");
        res.body.should.have.property("like");
        res.body.should.have.property("comment");
        res.body.should.have.property("_id");
        done();

        idRating = res.body._id;
      });
  });
});

describe("GET/idRecipe ratings", () => {
  it("should GET ratings by id recipe", (done) => {
    chai
      .request(apiURL)
      .get("/api/v1/ratings/findByRecipeId/" + idRecipe)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.forEach((rating) => {
          rating.should.have.property("idUser").eql(ratingPOST.idUser);
          rating.should.have.property("idRecipe").eql(ratingPOST.idRecipe);
          rating.should.have.property("like").eql(ratingPOST.like);
          rating.should.have.property("comment").eql(ratingPOST.comment);
        });
        done();
      });
  });
});

describe("GET/idUser ratings", () => {
  it("should GET ratings by id user", (done) => {
    chai
      .request(apiURL)
      .get("/api/v1/ratings/findByUserId/" + idUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");

        done();
      });
  });
});

describe("PUT Rating", () => {
  it("should update rating", (done) => {
    chai
      .request(apiURL)
      .put("/api/v1/ratings/" + idRating)
      .send(ratingPUT)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

describe("PUT Rating that does not exist", () => {
  it("should fail to update rating", (done) => {
    chai
      .request(apiURL)
      .put("/api/v1/ratings/ratingdoesnotexist")
      .send(ratingPUT)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe("DELETE Rating", () => {
  it("should delete rating", (done) => {
    chai
      .request(apiURL)
      .delete("/api/v1/ratings/" + idRating)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
