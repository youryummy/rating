 const {google} = require('googleapis');

API_KEY = 'AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs';
DISCOVERY_URL ='https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';


const validateRating = async function(newComment) {
      await google.discoverAPI(DISCOVERY_URL).then(client => {
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
            const toxicity = response.data.attributeScores.TOXICITY.summaryScore.value;
            console.log(toxicity);
            return toxicity;
          });
    })
    .catch(err => {
      throw err;
    });
  }

module.exports = {
    "validateRating": validateRating
}
 