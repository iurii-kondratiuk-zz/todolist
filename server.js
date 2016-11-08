const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const request = require('request');

const config = require('./config');

const app = express();

app.use(cookieParser());
app.use(session({ secret: '1234567890QWERTY' }));

app.use((req, res, next) => {
  if (req.session.accessToken) {
  	next();	
  } else {
  	const { state, code } = req.query;
  	if (code) {
  		request.post({
	  			url: 'https://www.wunderlist.com/oauth/access_token',
	  			form: {
	  				client_id: config.clientId,
	  				client_secret: config.secret,
	  				code
	  			}
  			}, (err, response, body) => {
  				const accessToken = JSON.parse(body).access_token;
				  if (accessToken) {
				  	req.session.accessToken = accessToken;
				  	next();
				  } else {
				  	res.send('Hello World!');
				  }
			});
  	} else {
  		res.redirect(`https://www.wunderlist.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&state=asdasddas`);	
  	}
  };
});

app.get('/', (req, res) => {
	console.log('render index.html', req.session.accessToken);
	res.send('render index.html: ' + req.session.accessToken);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
