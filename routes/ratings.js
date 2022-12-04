var express = require('express');
var router = express.Router();
var perspectiveService = require('../services/perspectiveService');
var Rating = require('../models/rating');
const { contactcenterinsights } = require('googleapis/build/src/apis/contactcenterinsights');
var debug = require('debug')('ratings-2:server');

 var ratings = [
  {"idRating": "0a", "idRecipe": "gd2", "idUser": "fad12", "like": true, "comment": "i love it"},
  {"idRating": "123a", "idRecipe": "413", "idUser": "fad12", "like": false, "comment": "i lfsdove it"},
  {"idRating": "0dda", "idRecipe": "gadfasd2", "idUser": "fad12", "like": true, "comment": "i love it"},
  {"idRating": "0a231", "idRecipe": "gadfasd2", "idUser": "daw23", "like": true, "comment": "i love it"},
] 

var accounts = [
  {"idUser": "fad12", "username": "deyan", "name": "Deyan", "profilePicture": "foto1"},
  {"idUser": "daw23", "username": "aniita", "name": "Ana", "profilePicture": "foto2"},
]

/* GET ratings listing. */
router.get('/', async function(req, res, next) {
  try {
    const result = await Rating.find();
    res.send(result.map((r) => r.cleanup()));
  }catch(e) {
    debug("DB problem", e);
    res.sendStatus(500);
  } 
  
});

/* GET ratings/ratingsByUser/idUser listing. */
router.get('/ratingsByUser/:idUser', function(req, res, next) {
  var idUser = req.params.idUser;
  var userRatings = ratings.filter(r => r.idUser === idUser && r.like);
  
  var result = [];
  userRatings.forEach(r => result.push(r.idRecipe));

  if(result){
    res.send(result);
  } else {
    res.sendStatus(401);
  }
});

/* GET ratings/idRecipe listing. */
router.get('/:idRecipe', function(req, res, next) {
  var idRecipe = req.params.idRecipe;
  var ratingsForRecipe = ratings.filter(r => r.idRecipe === idRecipe);

  ratingsForRecipe.forEach(function (r, index) {
    //AQUI DEBERIA ESTAR LA FUNCION AWAIT QUE LLAMA A ACCOUNTS
    accountInfo = accounts.find(a => {
      return a.idUser === r.idUser;
    })
    
    Object.assign(ratingsForRecipe[index], accountInfo);

  });
  
  if(ratingsForRecipe){
    res.send(ratingsForRecipe);
  } else {
    res.sendStatus(401);
  }
});

/* POST ratings */
router.post('/', async function(req, res, next) {
  const {like, comment, idRecipe, idUser} = req.body;

  const rating = new Rating({
    like, 
    comment, 
    idRecipe, 
    idUser
  });

  try{
    await rating.save();
    return res.sendStatus(201);
  } catch(e) {
    if(e.errors){
      debug("Validation problem when saving");
      res.status(400).send({error: e.message});
    }else{
      debug("DB problem", e);
      res.sendStatus(500);
    }
   
  }
});
 

module.exports = router;

/* GET perspective test listing. */
router.post('/perspective/', function(req, res, next) {
  try {
    const result = perspectiveService.validateRating();
    res.send(result);
  }catch(e){
    res.sendStatus((500));
  }
}); 