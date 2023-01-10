import Rating from "../mongo/rating.js";
import { Types } from "mongoose";
import { logger } from "@oas-tools/commons";
import _ from "lodash";
import * as perspective from '../services/perspective.js';
import { CircuitBreaker } from "../circuitBreaker/circuitBreaker.js";


export async function findByRecipeId(req, res) {
  
  const recipe = req.params.idRecipe;
  
  CircuitBreaker.getBreaker(Rating).fire("find", {idRecipe: recipe}).then(result => {
    
    if(result) {
      res.send(result);

    } else {
      res.sendStatus(404);
    }
    
  }).catch((err) => {
    res.sendStatus(500).send({ error: err.message });
  })
}

export async function findByUserId(req, res) {

  const user = req.params.idUser;
  
  CircuitBreaker.getBreaker(Rating).fire("find", {idUser: user}).then(result => {
    
    if(result) {
      res.send(result);

    } else {
      res.sendStatus(404);
    }
    
  }).catch((err) => {
    res.sendStatus(500).send({ error: err.message });
  })

}

export async function updateRating(req, res) {
  const valueLike = req.body.like;
  const valueComment = req.body.comment;
  const rating = req.params._id;

  const validationResult = await perspective.validateRating(valueComment);
  if (validationResult > 0.5) {
    valueComment = "This comment has been removed due to toxicity";
  }

  var existingRating = await Rating.findOne({
    _id: req.params.idRating,
  });

  if (existingRating != null) {

    CircuitBreaker.getBreaker(Rating).fire("findByIdAndUpdate", {idRating: rating}, {like: valueLike, comment: valueComment}).then(result => {
      if(result) {
        res.sendStatus(201);

      } else {
        res.sendStatus(404);
      }

    }).catch ((err) => {
      res.status(500).send({ errror: err.message });
    })
  }
}

export async function deleteRating(req, res) {

  const rating = req.params.idRating;

    try {
      CircuitBreaker.getBreaker(Rating).fire("delete", {idRating: rating});
      return res.sendStatus(201);

      } catch (err) {
        res.status(400).send({ error: err.message });
      }
}

export async function getAllRatings(req, res) {
  
  CircuitBreaker.getBreaker(Rating).fire("find", {}).then((result) => {
    res.send(result);
    
  }).catch((err) => {
    res.status(500).send({ error: err.message });
  })
}

export async function addRating(req, res) {

  const newRating = req.body;

      try {

        const validationResult = await perspective.validateRating(newRating.comment);

        if (validationResult > 0.5) {
          newRating.comment = "This comment has been removed due to toxicity";
        }

        CircuitBreaker.getBreaker(Rating).fire("create", newRating);
        return res.sendStatus(newRating);
        
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
}
