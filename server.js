const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rp = require('request-promise');
const serverStatic = require('serve-static');
const WunderlistSDK = require('wunderlist');

let wunderlistAPI = null;

const config = require('./config');

const app = express();

app.set('views', './public');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({ secret: '1234567890QWERTY' }));

app.use(express.static('./dist'));

const getAccessToken = (req, res, code) => {
	rp({
    method: 'POST',
    uri: 'https://www.wunderlist.com/oauth/access_token',
    body: {
      client_id: config.clientId,
      client_secret: config.secret,
      code
    },
    json: true,
  })
  .then(({ access_token }) => {
    req.session.accessToken = access_token;
    wunderlistAPI = new WunderlistSDK({ 'accessToken': access_token, 'clientID': config.clientId });
    res.redirect(req.path); // remove url params
  })
  .catch(err => res.status(403).send('Authentication Error'));
};

app.use((req, res, next) => {
  const { state, code } = req.query;
  if (req.session.accessToken) return next();
  if (code) return getAccessToken(req, res, code);
  res.redirect(`https://www.wunderlist.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&state=asdasddas`); 
});

app.get('/', (req, res) => {
	console.log('render index.html', req.session.accessToken);
	res.render('index');
});

app.get('/todos', (req, res) => {
	wunderlistAPI.http.lists.all()
	  .done((lists) => {
	    const inbox = lists.find((list) => list.title === 'inbox');
	    wunderlistAPI.http.tasks.forList(inbox.id, req.query.completed === 'true')
	    	.done((tasks) => {
	    		res.status(200).send(tasks);
	    	})
	    	.fail(() => console.error('there was a problem'));
	  })
	  .fail(() => console.error('there was a problem'));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
