const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rp = require('request-promise');
const serverStatic = require('serve-static');

const config = require('./config');

const app = express();

app.set('views', './public');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({ secret: '1234567890QWERTY' }));

app.use(express.static('./dist'));

const getAccessToken = (code) => {
  return rp({
    method: 'POST',
    uri: 'https://www.wunderlist.com/oauth/access_token',
    body: {
      client_id: config.clientId,
      client_secret: config.secret,
      code
    },
    json: true,
  });
}

app.use((req, res, next) => {
  const { state, code } = req.query;
  if (req.session.accessToken) return next();
  if (code) {
    return getAccessToken(code)
      .then((response) => {
        req.session.accessToken = response.access_token;
        res.redirect(req.path); // remove url params
      })
      .catch((err) => {
        res.status(403).send('Authentication Error');
      });
  }
  res.redirect(`https://www.wunderlist.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&state=asdasddas`); 
});

app.get('/', (req, res) => {
	console.log('render index.html', req.session.accessToken);
	res.render('index');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
