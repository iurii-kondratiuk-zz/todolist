import axios from 'axios';
import { arrayMove } from 'react-sortable-hoc';

import * as types from '../constants/ActionTypes';

export const addTodo = (listId, title, positions, positionsRevision)  => dispatch => {
  return axios.post('/todos', { listId, title, positions, positionsRevision })
    .then(json => (console.log(json), dispatch({
      type: types.ADD_TODO,
      ...json.data,
    })));
};

export const completeTodo = ({ id, revision }, listId, positions, positionsRevision)  => dispatch => {
  dispatch(requestTodoUpdate(id));
  return axios.put(`/todos/${id}`, {
    data: { completed: true },
    revision,
    listPositions: { listId, positions, positionsRevision },
  })
    .then(json => dispatch({
      type: types.COMPLETE_TODO,
      ...json.data,
    }));    
};

export const fetchTodos = ({ completed }) => dispatch => {
  dispatch(requestTodos(completed));
  return axios.get('/todos', { params: { completed } })
    .then(json => dispatch({
      type: types.RECEIVE_TODOS,
      completed,
      ...json.data,
    }));
};

export const requestTodos = completed => ({
  type: types.REQUEST_TODOS,
  completed,
});

export const requestTodoUpdate = id => ({
  type: types.REQUEST_TODO_UPDATE,
  id,
});

export const swapTodos = (inbox, listId, revision, { newIndex, oldIndex }) => dispatch => {
  const newInbox = arrayMove(inbox, oldIndex, newIndex);

  dispatch({ type: types.UPDATE_TODO_POSITIONS, revision: revision + 1, values: newInbox }); // optimistic update
  return axios.put('/todoPositions', { revision, values: newInbox, listId })
    .then(json => dispatch({
      type: types.UPDATE_TODO_POSITIONS,
      revision: json.data.revision,
      values: json.data.values,
    }))
    .catch(() => dispatch({ // revert optimistic update in case of error
      type: types.UPDATE_TODO_POSITIONS,
      revision,
      values: inbox,
    }));  
};

export const toggleCompletedTodos = () => ({
  type: types.TOGGLE_COMPLETED_TODOS,
});

export const uncompleteTodo = ({ id, revision }, listId, positions, posRevision)  => dispatch => {
  dispatch(requestTodoUpdate(id));
  return axios.put(`/todos/${id}`, {
    data: { completed: false },
    revision,
    listPositions: { listId, positions, positionsRevision: posRevision },
  })
    .then(json => dispatch({
      type: types.UNCOMPLETE_TODO,
      ...json.data,
    }));    
};


