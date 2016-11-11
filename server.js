const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const serverStatic = require('serve-static');
const session = require('express-session');

const {
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
} = require('./server.utils.js');

const config = require('./config');

const app = express();

app.set('views', './public');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: '1234567890QWERTY' }));

app.use(express.static('./dist'));

app.use(authorizationMiddleware);

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
  const { listId, title, positions, positionsRevision } = req.body;
  createTodo(listId, title)
    .done(todo => {
      updateTodoPositions(listId, positionsRevision, [todo.id, ...positions])
        .then(todoPositions => res.status(200).send({ todo, todoPositions }))
        .catch(respondWithError(res, 'there was a problem with updating a todo positions'));
    })
    .fail(respondWithError(res, 'there was a problem with creating a todo'));
});

app.put('/todos/:todoId', (req, res) => {
  const { data, revision, listPositions } = req.body;
  updateTodo(req.params.todoId, { data, revision })
    .done(respondWithTodoAndNewPositions(res, listPositions, !data.completed))
    .fail(respondWithError(res, 'there was a problem with updating a todo'));
});

app.put('/todoPositions', (req, res) => {
  const { revision, values, listId } = req.body;
  updateTodoPositions(listId, revision, values)
    .then(identityResponse(res))
    .catch(respondWithError(res, 'there was a problem with updating a todo positions'));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000: http://localhost:3000');
});
