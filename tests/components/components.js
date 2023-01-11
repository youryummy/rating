import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

let recipeId;
let ratingId;
let userId;
let ratingPOST = { idUser: "test_POST", idRecipe: "test_POST", like: "test_POST", comment: "test_POST"}

const apiURL = "http://localhost:8080"

describe('get Ratings', () => {
    it('should return all ratings', () => {
        chai.request(apiURL)
        .get('/api/v1/ratings')
        .end((err, res) => {
            res.body.should.be.a('object');
        })
    })
})

describe('post Ratings', () => {
    it('should add a rating', () => {
        chai.request(apiURL)
        .post('/api/v1/ratings')
        .send(ratingPOST)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('idUser');
            res.body.should.have.property('idRecipe');
            res.body.should.have.property('like');
            res.body.should.have.property('comment');

            ratingId = res.body.idRating
            recipeId = res.body.idRecipe;
            userId = res.body.idUser;
        })
    })
})

describe('get ratings by Id recipe', () => {
    it('should get ratings by id recipe', () => {
        chai.request(apiURL)
        .get('/api/v1/ratings/' + recipeId)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('idUser').eql(ratingPOST.idUser);
            res.body.should.have.property('idRecipe').eql(ratingPOST.idRecipe);
            res.body.should.have.property('like').eql(ratingPOST.like);
            res.body.should.have.property('comment').eql(ratingPOST.comment);
        })
    })
})

describe('get ratings by Id user', () => {
    it('should get ratings by id user', () => {
        chai.request(apiURL)
        .get('/api/v1/ratings/' + userId)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('idUser').eql(ratingPOST.idUser);
            res.body.should.have.property('idRecipe').eql(ratingPOST.idRecipe);
            res.body.should.have.property('like').eql(ratingPOST.like);
            res.body.should.have.property('comment').eql(ratingPOST.comment);
        })
    })
})

describe('put Rating', () => {
    it('should update rating', () => {
        chai.request(apiURL)
        .put('/api/v1/ratings/' + ratingId)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
        })
    })
})

describe('delete Rating', () => {
    it('should delete rating', () => {
        chai.request(apiURL)
        .delete('/api/v1/ratings/' + ratingId)
        .end((err, res) => {
            res.should.have.status(204);
        })
    })
})