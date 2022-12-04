/* const {google} = require('googleapis');

API_KEY = 'AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs';
DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

google.discoverAPI(DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!',
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      };

      client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            console.log(JSON.stringify(response.data, null, 2));
          });
    })
    .catch(err => {
      throw err;
    });
 */
/* 
const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs',
    params: {
        comment: {
          text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!'
        },
        requestedAttributes: {
          TOXICITY: {},
        }
      }
};

const validateRating = async function() {
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    })
}
console.log(validateRating());

module.exports = {
    "validateRating": validateRating
}
 */



const axios = require('axios');

const validateRating = async function(name) {
    try {
        const url = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs";
        const response = await axios.post(url, {
            comment: {
                text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!'
              },
              requestedAttributes: {
                TOXICITY: {},
              }
          });
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

console.log(validateRating());


module.exports ={
    "validateRating": validateRating
}