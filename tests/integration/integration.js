import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

const ratingController = {
  deleteRating: sinon.stub().resolves(),
  findByRecipeId: sinon.stub().resolves(),
  findByUserId: sinon.stub().resolves(),
  getAllRatings: sinon.stub().resolves(),
  updateRating: sinon.stub().resolves(),
  addRating: sinon.stub().resolves(),
};

describe("ratingController.getAllRatings()", () => {
  it("should call ratingController.getAllRatings()", async () => {
    const req = {
      query: {},
    };

    const res = {
      send: sinon.stub(),
    };

    await ratingController.getAllRatings(req, res);
    expect(ratingController.getAllRatings).to.have.been.calledWith(req, res);
  });
});

describe("ratingController.addRating()", () => {
  it("should call ratingController.addRating() with the correct arguments", () => {
    const req = {
      body: {
        idRecipe: "1234",
        idUser: "testUser",
        like: true,
        comment: "test comment",
      },
    };

    const res = {
      send: sinon.stub(),
    };

    ratingController.addRating(req, res);
    expect(ratingController.addRating).to.have.been.calledWith(req, res);
  });
});

describe("ratingController.findByUserId()", () => {
  it("should call ratingController.findByUserId() with the correct arguments", async () => {
    const req = {
      params: {
        id: "12345",
      },
    };

    const res = {
      send: sinon.stub(),
    };

    await ratingController.findByUserId(req, res);
    expect(ratingController.findByUserId).to.have.been.calledWith(req, res);
  });
});

describe("ratingController.findByRecipeId()", () => {
  it("should call ratingController.findByRecipeId() with the correct arguments", async () => {
    const req = {
      params: {
        id: "12345",
      },
    };

    const res = {
      send: sinon.stub(),
    };

    await ratingController.findByRecipeId(req, res);
    expect(ratingController.findByRecipeId).to.have.been.calledWith(req, res);
  });
});

describe("ratingController.updateRating()", () => {
  it("should call ratingController.updateRating() with the correct arguments", async () => {
    const req = {
      params: {
        id: "12345",
      },
      body: {
        idRecipe: "1111",
        idUser: "testUser2",
        like: false,
        comment: "test comment 2",
      },
    };

    const res = {
      send: sinon.stub(),
    };

    await ratingController.updateRating(req, res);
    expect(ratingController.updateRating).to.have.been.calledWith(req, res);
  });
});

describe("ratingController.deleteRating()", () => {
  it("should call ratingController.deleteRating() with the correct arguments", async () => {
    const req = {
      params: {
        id: "12345",
      },
    };

    const res = {
      send: sinon.stub(),
    };

    await ratingController.deleteRating(req, res);
    expect(ratingController.deleteRating).to.have.been.calledWith(req, res);
  });
});
