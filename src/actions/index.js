import * as types from '../constants/ActionTypes';

let latestTodoId = 0;

export const addTodo = text => ({
  type: types.ADD_TODO,
  id: latestTodoId++,
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
