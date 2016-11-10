import axios from 'axios';
import { arrayMove } from 'react-sortable-hoc';

import * as types from '../constants/ActionTypes';

export const addTodo = (listId, title)  => dispatch => {
  axios.post(`/todos`, { listId, title })
    .then(json => dispatch({
      type: types.ADD_TODO,
      todo: json.data,
    }));
};

export const completeTodo = ({ id, revision })  => dispatch => {
  dispatch(requestTodoUpdate(id));
  axios.put(`/todos/${id}`, { revision, data: { completed: true } })
    .then(json => dispatch({
      type: types.COMPLETE_TODO,
      todo: json.data,
    }));    
};

export const fetchTodos = ({ completed }) => dispatch => {
  dispatch(requestTodos(completed));
  axios.get('/todos', { params: { completed } })
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

  dispatch({ type: types.SWAP_TODOS, revision: revision + 1, values: newInbox }); // optimistic update
  axios.put('/swapTodos', { revision, values: newInbox, listId })
    .then(json => dispatch({
      type: types.SWAP_TODOS,
      revision: json.data.revision,
      values: json.data.values,
    }));  
};

export const toggleCompletedTodos = () => ({
  type: types.TOGGLE_COMPLETED_TODOS,
});

export const uncompleteTodo = ({ id, revision })  => dispatch => {
  dispatch(requestTodoUpdate(id));
  axios.put(`/todos/${id}`, { revision, data: { completed: false } })
    .then(json => dispatch({
      type: types.UNCOMPLETE_TODO,
      todo: json.data,
    }));    
};


