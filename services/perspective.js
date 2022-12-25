import google from 'googleapis';

const API_KEY = 'AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs';
const DISCOVERY_URL ='https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

export async function validateRating(comment) {
      await google.discoverAPI(DISCOVERY_URL).then(client => {
      const analyzeRequest = {
        comment: {
          text: comment,
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
