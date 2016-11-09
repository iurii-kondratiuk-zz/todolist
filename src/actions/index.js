import * as types from '../constants/ActionTypes';
import axios from 'axios';

export const addTodo = (listId, title)  => dispatch => {
  axios.post(`/todos`, { listId, title })
    .then(json => dispatch({
      type: types.ADD_TODO,
      todo: json.data,
    }));
};

export const completeTodo = ({ id, revision })  => dispatch => {
  axios.put(`/todos/${id}`, { revision, data: { completed: true } })
    .then(json => dispatch({
      type: types.COMPLETE_TODO,
      todo: json.data,
    }));    
};
export const fetchTodos = ({ completed }) => (dispatch) => {
  dispatch(requestTodos(completed));
  axios.get(`/todos`, { params: { completed } })
    .then(json => dispatch({
      type: types.RECEIVE_TODOS,
      todos: json.data,
      completed,
    }));
}

export const requestTodos = completed => ({
  type: types.REQUEST_TODOS,
  completed,
})

export const swapTodos = indexes => ({
  type: types.SWAP_TODOS,
  ...indexes
});


export const toggleCompletedTodos = () => ({
  type: types.TOGGLE_COMPLETED_TODOS,
});

export const uncompleteTodo = ({ id, revision })  => dispatch => {
  axios.put(`/todos/${id}`, { revision, data: { completed: false } })
    .then(json => dispatch({
      type: types.UNCOMPLETE_TODO,
      todo: json.data,
    }));    
};


