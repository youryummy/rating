const axios = require('axios');
const urlJoin = require('url-join');
const debug = require('debug')('ratings-service:ratings');

const RATINGS_SERVICE = process.env.RATINGS_SERVICE || 'http://localhost:3333';
const API_VERSION = 'api/v1';

const getUser = async function(idUser) {
    try {
        const url = urlJoin(ACCOUNTS_SERVICE, API_VERSION, '/accounts', idUser);
        const response = await axios.get(url);
        debug(response);
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

module.exports ={
    "getUser": getUser
}