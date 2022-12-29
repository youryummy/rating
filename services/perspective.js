import {google} from "googleapis";

const API_KEY = 'AIzaSyB9ck5rEqD3qI6pE1VZZkoyqOrB0mEUhNs';
const DISCOVERY_URL ='https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

export async function validateRating(comment) {
  return new Promise((resolve, reject) => {
  
       google.discoverAPI(DISCOVERY_URL).then( (client) => {
         client.comments.analyze(
          {
            key: API_KEY,
            resource: {
              comment: {
                text: comment,
              },
              requestedAttributes: {
                TOXICITY: {},
              },
            }
          },
          async (err, response) => {
            if (err) {
              resolve(0);
            return 0;
            }
            const toxicity = await response.data.attributeScores.TOXICITY.summaryScore.value;
            resolve(toxicity);
            return toxicity;
          });
      });

    });
    
  }
