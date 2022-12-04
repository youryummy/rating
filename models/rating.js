const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    idRecipe: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
});

ratingSchema.methods.cleanup = function() {
    return {
        like: this.like,
        comment: this.comment,
        idRecipe: this.idRecipe,
        idUser: this.idUser,
    }
}

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;