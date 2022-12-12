const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        required: [true, "Like is required"],
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minLength: 1,
        maxLength: 150,
    },
    idRecipe: {
        type: String,
        required: [true, "Id of Recipe is required"],
        minLength: 1,
        maxLength: 6,
    },
    idUser: {
        type: String,
        required: [true, "Id of User is required"],
        minLength: 1,
        maxLength: 6,
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
