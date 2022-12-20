import * as service from '../services/apiv1ratingsidRatingService.js';

export function findByidRating(req, res) {
    service.findByidRating(req, res);
}

export function updateRating(req, res) {
    service.updateRating(req, res);
}

export function deleteRating(req, res) {
    service.deleteRating(req, res);
}

