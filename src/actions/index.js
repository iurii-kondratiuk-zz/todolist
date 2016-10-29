import * as types from '../constants/ActionTypes';

let latestTodoId = 0;
let latestTodoIndex = 0;

export const addTodo = text => ({
  type: types.ADD_TODO,
  id: latestTodoId++,
  index: latestTodoIndex++,
  text,
});

export const completeTodo = id => ({
	type: types.COMPLETE_TODO,
	id,
})
