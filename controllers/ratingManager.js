import * as service from '../services/ratingManager.js';

export function addRating(req, res) {
    service.addRating(req, res);
}

export function getAllRatings(req, res) {
    service.getAllRatings(req, res);
}

export function updateRating(req, res) {
    service.updateRating(req, res);
}

export function deleteRating(req, res) {
    service.deleteRating(req, res);
}

export function findByRecipeId(req, res) {
    service.findByRecipeId(req, res);
}

export function findByUserId(req, res) {
    service.findByUserId(req, res);
}