import Rating from "../mongo/rating.js";
import {Types} from 'mongoose';
import {logger} from "@oas-tools/commons";
import _ from 'lodash';

export function getRatings(_req, res) {
    const idRecipe = req.params.idRecipe;
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

export function createRating(req, res) {
    const {like, comment, idRecipe, idUser} = req.body;

  const rating = new Rating({
    like, 
    comment, 
    idRecipe, 
    idUser
  });

  //pendiente añadir comprobacion con perspective api

  try{
    rating.save();
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
}

/*
No lo necesitamos
 export function findByidRating(req, res) {
    res.send({
        message: 'This is the mockup controller for updateRating'
    });
}
 */
export function updateRating(req, res) {
    res.send({
        message: 'This is the mockup controller for updateRating'
    });
}

export function deleteRating(req, res) {
    res.send({
        message: 'This is the mockup controller for deleteRating'
    });
}

