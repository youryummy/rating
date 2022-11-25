var express = require('express');
var router = express.Router();

var ratings = [
  {"idRating": "0a", "idRecipe": "gd2", "idUser": "fad12", "like": true, "comment": "i love it"},
  {"idRating": "123a", "idRecipe": "413", "idUser": "faddf12", "like": false, "comment": "i lfsdove it"},

]

/* GET ratings listing. */
router.get('/', function(req, res, next) {
  res.send(ratings);
});

/* GET ratings/userId listing. */
router.get('/:idUser', function(req, res, next) {
  var idUser = req.params.idUser;
  /*Para prueba con accounts
    var result = recipesBooks.filter(recipeBook => accounts.find(a => a.username === username).recipesBooks.includes(recipeBook.id));
  */

  var result = ratings.filter(r => r.idUser === idUser);
  if(result){
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

/* POST ratings */
router.post('/', function(req, res, next) {
  var rating = req.body;
  ratings.push(rating);
  res.sendStatus(201);
});


module.exports = router;
