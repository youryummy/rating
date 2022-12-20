import Rating from "../mongo/rating.js";
import {Types} from 'mongoose';
import {logger} from "@oas-tools/commons";
import _ from 'lodash';

export function findByidRating(req, res) {
    res.send({
        message: 'This is the mockup controller for findByidRating'
    });
}

export function updateRating(req, res) {
    res.send({
        message: 'This is the mockup controller for updateRating'
    });
}

export function deleteRating(req, res) {
    res.send({
        message: 'This is the mockup controller for deleteRating'
    });
}

