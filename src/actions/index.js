import * as types from '../constants/ActionTypes';

export const addTodo = text => ({
  type: types.ADD_TODO,
  text,
});

export const completeTodo = id => ({
  type: types.COMPLETE_TODO,
  id,
});

export const swapTodos = (indexes) => ({
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

