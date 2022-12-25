import Rating from "../mongo/rating.js";
import {Types} from 'mongoose';
import {logger} from "@oas-tools/commons";
import _ from 'lodash';

export function getRatings(_req, res) {
    const idRecipe = _req.params.idRecipe;
    Rating.find({idRecipe: idRecipe}).then((ratingsForRecipe) => {     
        
        /*
        ratingsForRecipe.forEach(function (r, index) {
        //AQUI DEBERIA ESTAR LA FUNCION AWAIT QUE LLAMA A ACCOUNTS
        accountInfo = accounts.find(a => {
            return a.idUser === r.idUser;
        })
        
        Object.assign(ratingsForRecipe[index], accountInfo);
    
        });
        */
        res.send(ratingsForRecipe);
    }).catch((err) => {
        logger.error(`Error while getting ratings for recipe: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}

export function getRatingsByUser(_req, res) {
    const idUser = _req.params.idUser;
    console.log("iduser: " + idUser);
    Rating.find({idUser: idUser, like: true}).then((ratingsByUser) => {     
        /*Falta hacer que solo se mande el string, se pasa mal, preguntar alex
        
        
        /Para cada rating añadimos el idRecipe al array result
        var result = [];
        ratingsByUser.forEach(r => result.push(r.idRecipe));
        console.log("Result: " + result);
        res.send(result);*/

        res.send(ratingsByUser);
    }).catch((err) => {
        logger.error(`Error while getting ratings for user: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    });
}

/*
//Este metodo no se necesita pero si la quito da fallo
 export function findByidRating(req, res) {
    res.send({
        message: 'This is the mockup controller for updateRating'
    });
}*/

export function updateRating(req, res) {
    res.send({
        message: 'This is the mockup controller for updateRating'
    });
}

export async function deleteRating(req, res) {
    const idRating = req.params.idRating;
    console.log("idrating: " + idRating);

    const rating = await Rating.find({_id: idRating});
  
       
      try{
          await Rating.deleteOne(rating);
          return res.sendStatus(200);
        } catch(e) {
          if(e.errors){
        
            res.status(400).send({error: e.message});
          }else{
        
            res.sendStatus(501);
          }
         
        }
}

export function getAllRatings(req, res) {
    Rating.find({}).then((results) => {     
        console.log(results); 
        res.send(results.map(r => 
            _.set(
                _.pick(r, ['like','comment', 'idUser', 'idRecipe', '_id'])
            )
        ));
  }).catch((err) => {
      logger.error(`Error while getting all ratings: ${err.message}`);
      res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
  });
  }
  
  export async function addRating(req, res)  {

    const {like, comment, idRecipe, idUser} = req.body;

    //pendiente añadir comprobacion con perspective api


    const rating = new Rating({
      like, 
      comment, 
      idRecipe, 
      idUser
    }); 

    var existingRating = await Rating.findOne({idUser: req.body.idUser, idRecipe: req.body.idRecipe});
    if(existingRating != null){
        existingRating.comment = rating.comment;
        existingRating.like = rating.like;
    }
  
  
    try{
        if(existingRating != null){
            console.log("entro:",existingRating);
            existingRating.save();
        }else{
            await rating.save();
        }
      return res.sendStatus(201);
    } catch(e) {
      if(e.errors){
    
        res.status(400).send({error: e.message});
      }else{
    
        res.sendStatus(501);
      }
     
    }
  }
  
  