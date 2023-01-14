import Rating from "../mongo/rating.js";
import { Types } from "mongoose";
import { logger } from "@oas-tools/commons";
import _ from "lodash";
import * as perspective from "../services/perspective.js";
import { CircuitBreaker } from "../circuitBreaker/circuitBreaker.js";
import axios from "axios";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://youryummy-account-service:80";

export async function findByRecipeId(req, res) {
  const recipe = req.params.idRecipe;

  CircuitBreaker.getBreaker(Rating)
    .fire("find", { idRecipe: recipe })
    .then((result) => {
      if (result) {
        var newResult = JSON.parse(JSON.stringify(result));

        var p = newResult.map((r) => {
          return axios
            .get(`${backendUrl}/api/v1/accounts/${r.idUser}`, {
              withCredentials: true,
            })
            .then((userData) => {
              Object.assign(r, userData.data);
              console.log("r: ", r);
              console.log("userData.data: ", userData.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });

        Promise.all(p).then(() => {
          res.send(newResult);
        });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.sendStatus(500).send({ error: err.message });
    });
}

export async function findByUserId(req, res) {
  const user = req.params.idUser;

  CircuitBreaker.getBreaker(Rating)
    .fire("find", { idUser: user })
    .then((result) => {
      if (result) {
        var resultsIdsOnly = [];

        result.forEach(function (r, index) {
          resultsIdsOnly.push(r.idRecipe);
        });

        res.send(resultsIdsOnly);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.sendStatus(500).send({ error: err.message });
    });
}

export async function updateRating(req, res) {
  const valueLike = req.body.like;
  let valueComment = req.body.comment;
  const idRating = req.params.idRating;
  const idUser = req.body.idUser;
  const idRecipe = req.body.idRecipe;

  try {
    const validationResult = await perspective.validateRating(valueComment);
    if (validationResult > 0.5) {
      valueComment = "This comment has been removed due to toxicity";
    }

    CircuitBreaker.getBreaker(Rating)
      .fire(
        "findByIdAndUpdate",
        { _id: idRating },
        {
          like: valueLike,
          comment: valueComment,
          idUser: idUser,
          idRecipe: idRecipe,
        }
      )
      .then((result) => {
        if (result) {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.status(500).send({ errror: err.message });
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

export async function deleteRating(req, res) {
  const rating = req.params.idRating;

  try {
    CircuitBreaker.getBreaker(Rating).fire("findByIdAndDelete", {
      _id: rating,
    });
    return res.sendStatus(204);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

export async function getAllRatings(req, res) {
  CircuitBreaker.getBreaker(Rating)
    .fire("find", {})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
}

export async function addRating(req, res) {
  const newRating = req.body;

  try {
    const validationResult = await perspective.validateRating(
      newRating.comment
    );

    if (validationResult > 0.5) {
      newRating.comment = "This comment has been removed due to toxicity";
    }

    CircuitBreaker.getBreaker(Rating)
      .fire("create", newRating)
      .then((newRating) => {
        if (addRating) {
          return res.send(newRating);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}
