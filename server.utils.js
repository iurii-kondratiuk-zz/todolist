const Promise = require('bluebird');
const rp = require('request-promise');
const WunderlistSDK = require('wunderlist');

const config = require('./config');

let wunderlistAPI = null;
let headers = null;

const wunderlistOauth = 'https://www.wunderlist.com/oauth';
const wunderlistApiUrl = 'https://a.wunderlist.com/api/v1';

const authorizationMiddleware = (req, res, next) => {
  const { state, code } = req.query;
  if (req.session.accessToken) return next();
  if (code) return getAccessToken(req, res, code);
  res.redirect(
    `${wunderlistOauth}/authorize?client_id=${config.clientId}&` +
    `redirect_uri=${config.redirectUri}&state=asdasddas`
  ); 
}

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
    uri: `${wunderlistApiUrl}/task_positions/${listId}`,
    headers,
    body: { revision, values },
    json: true,
  });
}

const loadTodosPositions = lisdId => {
  return rp({
    method: 'GET',
    uri: `${wunderlistApiUrl}/task_positions`,
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
const respondWithError = (res, error) => (err) => res.status(400).send({ error, err });

const respondWithTodoAndNewPositions = (res, listPositions, addToList) => todo => {
  const { listId, positions, positionsRevision } = listPositions;
  const newPositions = addToList ? [...positions, todo.id] : positions.filter(id => id !== todo.id);
  if (newPositions.length) {
    updateTodoPositions(listId, positionsRevision, newPositions)
      .then(todoPositions => res.status(200).send({ todo, todoPositions }))
      .catch(respondWithError(res, 'there was a problem with updating a todo positions'));
  } else {
    // /task_positions enpoint respond with error if pass it an empty values array
    identityResponse(res)({ todo, todoPositions: { revision: positionsRevision, values: [] } });
  }
}

const respondWithTodos = (res, listId) => ([todos, todoPositions]) => {
  res.status(200).send({
    listId,
    todos,
    todoPositions: todoPositions ? todoPositions[0] : null,
  });
};

module.exports = {
  authorizationMiddleware,
  createTodo,
  identityResponse,
  isInbox,
  loadLists,
  loadListTasks,
  respondWithError,
  respondWithTodoAndNewPositions,
  respondWithTodos,
  updateTodo,
  updateTodoPositions,
};
