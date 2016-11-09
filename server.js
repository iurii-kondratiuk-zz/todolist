const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const createTask = (listId, title) => wunderlistAPI.http.tasks.create({ list_id: listId, title });
const loadLists = () => wunderlistAPI.http.lists.all();
const loadTasks = (listId, completed) => wunderlistAPI.http.tasks.forList(listId, completed);

app.use((req, res, next) => {
  const { state, code } = req.query;
  if (req.session.accessToken) return next();
  if (code) return getAccessToken(req, res, code);
  res.redirect(`https://www.wunderlist.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&state=asdasddas`); 
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/todos', (req, res) => {
	loadLists()
		.done(lists => {
			const inbox = lists.find((list) => list.title === 'inbox');
			loadTasks(inbox.id, req.query.completed === 'true')
				.done(tasks => res.status(200).send({ listId: inbox.id, tasks }))
				.fail(() => console.error('there was a problem with loading tasks'));
		})
		.fail(() => console.error('there was a problem with loading lists'));
});

app.post('/todos', (req, res) => {
  const { listId, title } = req.body;
  createTask(listId, title)
    .done(task => res.status(200).send(task))
    .fail(() => console.error('there was a problem with creating a task'));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
