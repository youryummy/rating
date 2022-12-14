import {Schema, model} from "mongoose";

const ratingSchema = new Schema({
    idUser: String,
    idRecipe: String,
    like: Boolean,
    comment: String,
    idRating: String
  }, { versionKey: false });

export default model('Rating', ratingSchema, 'ratings');