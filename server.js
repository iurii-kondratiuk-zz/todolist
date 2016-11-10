const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const Promise = require("bluebird");
const rp = require('request-promise');
const serverStatic = require('serve-static');
const session = require('express-session');
const WunderlistSDK = require('wunderlist');

let wunderlistAPI = null;
let headers = null;

const wunderlistOauth = 'https://www.wunderlist.com/oauth';
const wunderlistApi = 'https://a.wunderlist.com/api/v1';

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
    uri: `${wunderlistOauth}/access_token`,
    body: {
      client_id: config.clientId,
      client_secret: config.secret,
      code
    },
    json: true,
  })
  .then(({ access_token }) => {
    req.session.accessToken = access_token;
    headers = { 'X-Access-Token': access_token, 'X-Client-ID': config.clientId };
    wunderlistAPI = new WunderlistSDK({ 'accessToken': access_token, 'clientID': config.clientId });
    res.redirect(req.path); // remove url params
  })
  .catch(() => res.status(403).send({ error: 'Authentication Error' }));
};

const createTodo = (listId, title) => wunderlistAPI.http.tasks.create({ list_id: listId, title });
const loadLists = () => wunderlistAPI.http.lists.all();
const loadTodos = (listId, completed) => wunderlistAPI.http.tasks.forList(listId, completed);
const updateTodo = (taskId, { revision, data }) => wunderlistAPI.http.tasks.update(+taskId, revision, data);
const updateTodoPositions = (listId, revision, values) => {
  return rp({
    method: 'PUT',
    uri: `${wunderlistApi}/task_positions/${listId}`,
    headers,
    body: { revision, values },
    json: true,
  });
}

const loadTodosPositions = lisdId => {
  return rp({
    method: 'GET',
    uri: `${wunderlistApi}/task_positions`,
    headers,
    qs: { list_id: lisdId },
    json: true,
  });
}

const loadListTasks = (listId, completed) => {
  let promises = [loadTodos(listId, completed)];
  promises = !completed ? [...promises, loadTodosPositions(listId)] : promises;
  return Promise.all(promises);
};

const isInbox = list => list.title === 'inbox';
const identityResponse = res => response => res.status(200).send(response);
const respondWithError = (res, error) => () => res.status(400).send({ error });

const respondWithTodos = (res, listId) => ([todos, todoPositions]) => {
  res.status(200).send({
    listId,
    todos,
    todoPositions: todoPositions ? todoPositions[0] : null,
  });
};

app.use((req, res, next) => {
  const { state, code } = req.query;
  if (req.session.accessToken) return next();
  if (code) return getAccessToken(req, res, code);
  res.redirect(
    `${wunderlistOauth}/authorize?client_id=${config.clientId}&` +
    `redirect_uri=${config.redirectUri}&state=asdasddas`
  ); 
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  loadLists()
    .done(lists => {
      const inbox = lists.find(isInbox);
      loadListTasks(inbox.id, JSON.parse(req.query.completed))
        .then(respondWithTodos(res, inbox.id))
        .catch(respondWithError(res, 'there was a problem with loading todos'));
    })
    .fail(respondWithError(res, 'there was a problem with loading lists'));
});

app.post('/todos', (req, res) => {
  const { listId, title } = req.body;
  createTodo(listId, title)
    .done(identityResponse(res))
    .fail(respondWithError(res, 'there was a problem with creating a todo'));
});

app.put('/todos/:todoId', (req, res) => {
  updateTodo(req.params.todoId, req.body)
    .done(identityResponse(res))
    .fail(respondWithError(res, 'there was a problem with updating a todo'));
});

app.put('/swapTodos', (req, res) => {
  const { revision, values, listId } = req.body;
  updateTodoPositions(listId, revision, values)
    .then(identityResponse(res))
    .catch(respondWithError(res, 'there was a problem with updating a todo positions'));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000: http://localhost:3000');
});
