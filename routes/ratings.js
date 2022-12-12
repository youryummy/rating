var express = require('express');
var router = express.Router();
var perspectiveService = require('../services/perspectiveService');
var Rating = require('../models/rating');
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

/* GET all ratings listing. */
router.get('/', async function(req, res, next) {
  try {
    const result = await Rating.find();
    //res.send(result.map((r) => r.cleanup()));
    res.send(result);
  }catch(e) {
    debug("DB problem", e);
    res.sendStatus(500);
  } 
  
});

/* GET recipes liked by user listing. */
router.get('/ratingsByUser/:idUser', async function(req, res, next) {
  var idUser = req.params.idUser;
  var userRatings = await Rating.find({idUser: idUser, like: true});
  
  //Para cada rating añadimos el idRecipe al array result
  var result = [];
  userRatings.forEach(r => result.push(r.idRecipe));

  if(result){
    res.send(result);
  } else {
    res.sendStatus(401);
  }
});

/* GET ratings for recipe listing. */
router.get('/:idRecipe', async function(req, res, next) {
  try {
    var idRecipe = req.params.idRecipe;
    var ratingsForRecipe = await Rating.find({idRecipe: idRecipe});

    /*
    ratingsForRecipe.forEach(function (r, index) {
      //AQUI DEBERIA ESTAR LA FUNCION AWAIT QUE LLAMA A ACCOUNTS
      accountInfo = accounts.find(a => {
        return a.idUser === r.idUser;
      })
      
      Object.assign(ratingsForRecipe[index], accountInfo);
  
    });
    */

    res.send(ratingsForRecipe.map((r) => r.cleanup()));
  }catch(e) {
    debug("DB problem", e);
    res.sendStatus(500);
  } 

});

/* POST rating */
router.post('/', async function(req, res, next) {
  const {like, comment, idRecipe, idUser} = req.body;

  const rating = new Rating({
    like, 
    comment, 
    idRecipe, 
    idUser
  });

  //comprobar si rating existe antes
  //pendiente añadir comprobacion con perspective api

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

/* PUT rating */
router.put('/', async function(req, res, next) {
  const {like, comment, idRecipe, idUser} = req.body;

  const rating = new Rating({
    like, 
    comment, 
    idRecipe, 
    idUser
  });

  //pendiente añadir comprobacion con perspective api

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

/* PARA PRUEBAS, ELIMINAR LUEGO */
router.post('/perspective/', async function(req, res, next) {
  try {
    const result = await perspectiveService.validateRating("Asquerosa");
    //devuelve undefined, algo del await tiene que ser
    console.log("aqui" + result);
    res.send(result);
  }catch(e){
    res.sendStatus((500));
  }
}); 


/* DELETE rating. */
router.delete('/:idRating', async function(req, res, next) {
  var idRating = req.params.idRating;

  try {
    await Rating.deleteOne({_id: idRating});
    res.sendStatus((200));
  }catch(e){
    res.sendStatus((500));
  }

});