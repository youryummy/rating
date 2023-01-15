import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

var recipeId = "test_idRecipe";
var ratingId = "test_idRating";
var userId = "test_idUser";
let ratingPOST = { idUser: "test_idUser", idRecipe: "test_idRecipe", like: true, comment: "test_comment" }

const apiURL = "http://localhost:8080"

describe('get Ratings', () => {
    it('should return all ratings', () => {
        chai.request(apiURL)
        .get('/api/v1/ratings')
        .end((err, res) => {
            res.body.should.be.a('array');
            done();
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
            res.body.should.have.property('_id');
            done();
        })
    })
})

describe('get ratings by Id recipe', () => {
    it('should get ratings by id recipe', () => {
        chai.request(apiURL)
        .get('/api/v1/ratings/'+recipeId)
        .end((err, res) => {
            res.body.should.be.a('array');
            res.body.forEach(rating => {
                rating.should.have.property('idUser').eql(ratingPOST.idUser);
                rating.should.have.property('idRecipe').eql(ratingPOST.idRecipe);
                rating.should.have.property('like').eql(ratingPOST.like);
                rating.should.have.property('comment').eql(ratingPOST.comment);

                ratingId = rating._id;
                done();
            });

        })
    })
})

describe('get ratings by Id user', () => {
    it('should get ratings by id user', () => {
        chai.request(apiURL)
        .get('/api/v1/ratings/' + userId)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.forEach(r => {
                r.should.be.equal('test_idRecipe');
            });
            done();
        })
    })
})

describe('put Rating', () => {
    it('should update rating', () => {
        chai.request(apiURL)
        .put('/api/v1/ratings/' + ratingId)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        })
    })
})

describe('delete Rating', () => {
    it('should delete rating', () => {
        chai.request(apiURL)
        .delete('/api/v1/ratings/'+ratingId)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        })
    })
})
