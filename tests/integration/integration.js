/* import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

//import Rating from '../../mongo/rating';
//import { strict as assert } from 'node:assert';
//import mocks from "../mocks/index.js";
//import { deleteRating, findByRecipeId, findByUserId, getAllRating, updateRating, addRating, getAllRatings } from '../../services/ratingManager';

//chai.use(chaiHttp);
//chai.expect();
//chai.should();

//const apiURL = "http://localhost:8080"



//const req = {}, res = {}, mocklist = []; 
//const assertRequest = (expectedCode, expectedData, done) => {
//    console.log("expectedCode: ", expectedCode)
//    console.log("expectedData: ", expectedData)
//    res.send = (data) => { 
//        console.log("data: ", data)
//        try {
//            assert.deepStrictEqual(data, expectedData); 
//            done(); 
//        } catch(err) {
//            done(err);
//        }
//    }
//    res.status = (code) => { 
//        console.log("code: ", code)
//        try {
//            assert.deepStrictEqual(code, expectedCode); 
//            return res; 
//        } catch(err) { 
//            if (code >= 400) done(err);
//            else res.status = () => done(err);
//        }
//    };
//}

//describe("get User Id", () => {
//    const fixture = (idUser) => {
//        res.locals.oas.params = { idUser }
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//    });

//    it("Should return 200 when user found in DB", (done) => {
//        fixture("test");
//        findByUserId(req, res);
//        assertRequest(200, "test", done, (data) => data?.idUser);
//    });

//    it("Should return 500 when user not found in DB", (done) => {
//        fixture("testNotFound");
//        findByUserId(req, res);
//        assertRequest(500, {message: `Account with username '${res.locals.oas.params.idUser}' does not exist`}, done);
//    });
//});

//describe("get Recipe Id", () => {
//    const fixture = (idRecipe) => {
//        res.locals.oas.params = { idRecipe }
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//    });

//    it("Should return 200 when recipe found in DB", (done) => {
//        fixture("test");
//        findByRecipeId(req, res);
//        assertRequest(200, "test", done, (data) => data?.idRecipe);
//    });

//    it("Should return 500 when recipe not found in DB", (done) => {
//        fixture("testNotFound");
//        findByRecipeId(req, res);
//        assertRequest(500, {message: `Recipe with id '${res.locals.oas.params.idRecipe}' does not exist`}, done);
//    });
//});

//describe("put Rating", () => {
//    let breaker;
//    const fixture = (idRating, body, dbResponse, throwException = false, reason) => {
//        res.locals.oas.params = idRating;
//        res.locals.oas.body = { RatingInfo: body };
//        breaker = mocks.circuitBreaker(throwException, reason).fire("findOneAndUpdate", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//        req.file = null;
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 204 when rating updated successfully", (done) => {
//        fixture("oldTest", { idRating: "test" }, { idRating: "oldTest" });
//        updateRating(req, res);
//        assertRequest(204, undefined, done);
//    });

//    it("Should return 404 when rating does not exist", (done) => {
//        fixture("oldTest", { idRating: "test" }, null);
//        updateRating(req, res);
//        assertRequest(404, {message: `Rating with id '${res.locals.oas.params.idRating}' does not exist`}, done);
//    });

//    it("Should return 500 when database fails", (done) => {
//        fixture("oldTest", { idRating: "test" }, null, true, {message: "Circuit is open"});
//        updateRating(req, res);
//        assertRequest(500, {message: 'Unexpected error ocurred, please try again later'}, done);
//    });
//});

//describe("delete Rating", () => {
//    let breaker;
//    const fixture = (idRating, dbResponse, throwException = false, reason) => {
//        res.locals.oas.params = idRating;
//        breaker = mocks.circuitBreaker(throwException, reason).fire("findOneAndDelete", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//        req.file = null;
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 204 when rating is deleted successfully", (done) => {
//        fixture("test", { idRating: "test" });
//        deleteRating(req, res);
//        assertRequest(204, undefined, done);
//    });

//    it("Should return 400 when rating does not exist", (done) => {
//        fixture("test", undefined);
//        deleteRating(req, res);
//        assertRequest(400, undefined, done);
//    });

//});

//describe("get all Ratings", () => {
//    let breaker;
//    const fixture = (dbResponse, throwException = false) => {
//        breaker = mocks.circuitBreaker(throwException, "Circuit is open").fire("find", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 200 when ratings found in DB", (done) => {
//        fixture([{ idUser: "test", idRecipe: "test", like: "test", comment: "test" }]);
//        getAllRatings(req, res);
//        assertRequest(200, [{ idUser: "test", idRecipe: "test", like: "test", comment: "test" }], done);
//    });

//    it("Should return 200 with empty list when no ratings found in DB", (done) => {
//        fixture([]);
//        getAllRatings(req, res);
//        assertRequest(200, [], done);
//    });

//    it("Should return 500 when DB fails", (done) => {
//        fixture([], true);
//        getAllRatings(req, res);
//        assertRequest(500, { message: "Unexpected error ocurred, please try again later" }, done);
//    });
//});

//describe("post Rating", () => {
//    let breaker;
//    const fixture = (idRating, body, dbResponse, throwException = false, reason) => {
//        res.locals.oas.params = _id;
//        res.locals.oas.body = { RecipesBookInfo: body };
//        breaker = mocks.circuitBreaker(throwException, reason).fire("create", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//        req.file = null;
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 200 when recipes book updated successfully", (done) => {
//        fixture("oldTest", { _id: "test" }, { _id: "oldTest" });
//        addRecipesBook(req, res);
//        assertRequest(200, undefined, done);
//    });

//    it("Should return 404 when user does not exist", (done) => {
//        fixture("oldTest", { _id: "test" }, null);
//        addRecipesBook(req, res);
//        assertRequest(404, {message: `Recipes Book with id '${res.locals.oas.params._id}' does not exist`}, done);
//    });

    it("Should return 500 when database fails", (done) => {
        fixture("oldTest", { _id: "test" }, null, true, {message: "Circuit is open"});
        addRecipesBook(req, res);
        assertRequest(500, {message: 'Unexpected error ocurred, please try again later'}, done);
    });
});
 */