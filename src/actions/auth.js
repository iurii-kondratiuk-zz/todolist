import * as types from '../constants/ActionTypes';
import config from '../../config';

const wunderlistOAuth = 'https://www.wunderlist.com/oauth';

export const requestAuthCode = dispatch => {
  console.log('requestAuthCode');
  window.location.replace(`${wunderlistOAuth}/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&state=asdasddas`);
};

export const authenticate = code => dispatch => {

  fetch(`${wunderlistOAuth}/access_token`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.secret,
      code
    }),
  }).then(console.log)
};