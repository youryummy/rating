import Rating from "../mongo/rating.js";
import { Types } from "mongoose";
import { logger } from "@oas-tools/commons";
import _ from "lodash";
import * as perspective from '../services/perspective.js';


export async function getRatings(_req, res) {
  const idRecipe = _req.params.idRecipe;

  try {
    var ratingsForRecipe = await Rating.find({ idRecipe: idRecipe });

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
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

//No consigo que funcione
export async function getRatingsByUser(req, res) {
  const idUser = req.params.idUser;
  console.log("iduser: " + idUser);

  try {
    //const ratings = await Rating.find({idUser: idUser, like: true });
    //console.log(ratings);
    res.send("test");
  } catch (e) {
    if (e.errors) {
      res.status(400).send({ error: e.message });
    } else {
      res.sendStatus(501);
    }
  }
}

export async function updateRating(req, res) {
  //pendiente añadir comprobacion con perspective api

  try {
    var existingRating = await Rating.findOne({
      _id: req.params.idRating,
    });

    if (existingRating != null) {
      existingRating.comment = req.body.comment;
      existingRating.like = req.body.like;
      await existingRating.save();
    } else {
      res.sendStatus(404);
    }
    return res.sendStatus(201);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

export async function deleteRating(req, res) {
  const idRating = req.params.idRating;

  try {
    await Rating.deleteOne({ _id: idRating });
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

export async function getAllRatings(req, res) {
  try {
    var ratingsForRecipe = await Rating.find({});
    res.send(ratingsForRecipe);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

export async function addRating(req, res) {
  const { like, comment, idRecipe, idUser } = req.body;

  //pendiente añadir comprobacion con perspective api
  const validationResult = await perspective.validateRating(comment);
  console.log(validationResult);

  try {
    var existingRating = await Rating.findOne({
      idUser: idUser,
      idRecipe: idRecipe,
    });

    if (existingRating != null) {
      existingRating.comment = comment;
      existingRating.like = like;
      await existingRating.save();
    } else {
      const rating = new Rating({
        like,
        comment,
        idRecipe,
        idUser,
      });

      await rating.save();
    }
    return res.sendStatus(201);
  } catch (e) {
    if (e.errors) {
      res.status(400).send({ error: e.message });
    } else {
      res.sendStatus(501);
    }
  }
}
