 const {google} = require('googleapis');

API_KEY = 'AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs';
DISCOVERY_URL ='https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';


const validateRating = function(newComment) {
      google.discoverAPI(DISCOVERY_URL).then(client => {
      const analyzeRequest = {
        comment: {
          text: newComment,
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
            return response.data;
          });
    })
    .catch(err => {
      throw err;
    });
  }

module.exports = {
    "validateRating": validateRating
}
 