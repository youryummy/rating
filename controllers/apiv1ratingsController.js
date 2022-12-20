import * as service from '../services/apiv1ratingsService.js';

export function getRatings(req, res) {
    service.getRatings(req, res);
}

export function addRating(req, res) {
    service.addRating(req, res);
}

export function getRating(req, res) {
    service.getRating(req, res);
}

export function createRating(req, res) {
    service.createRating(req, res);
}

