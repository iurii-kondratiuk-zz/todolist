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

export const swapTodos = ({ oldIndex, newIndex }) => ({
  type: types.SWAP_TODOS,
  oldIndex,
  newIndex,
});

