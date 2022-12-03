var express = require('express');
var router = express.Router();

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
router.get('/', function(req, res, next) {
  res.send(ratings);
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
router.post('/', function(req, res, next) {
  var rating = req.body;
  ratings.push(rating);
  res.sendStatus(201);
});


module.exports = router;
