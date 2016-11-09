import * as types from '../constants/ActionTypes';
import axios from 'axios';

export const addTodo = (listId, title)  => dispatch => {
  axios.post(`/todos`, { listId, title })
    .then(json => dispatch({
      type: types.ADD_TODO,
      todo: json.data,
    }));
};

export const completeTodo = id => ({
  type: types.COMPLETE_TODO,
  id,
});

export const swapTodos = indexes => ({
  type: types.SWAP_TODOS,
  ...indexes
});

export const uncompleteTodo = id => ({
  type: types.UNCOMPLETE_TODO,
  id,
});

export const toggleCompletedTodos = () => ({
  type: types.TOGGLE_COMPLETED_TODOS,
});

export const fetchTodos = ({ completed }) => (dispatch) => {
	axios.get(`/todos`, { params: { completed } })
    .then(json => dispatch({
    	type: types.RECEIVE_TODOS,
    	todos: json.data,
      completed,
    }));
}
