import * as service from '../services/apiv1ratingsService.js';

export function getRating(req, res) {
    service.getRating(req, res);
}

export function addRating(req, res) {
    service.addRating(req, res);
}

