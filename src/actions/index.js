import * as types from '../constants/ActionTypes';

let latestTodoId = 0;
let latestTodoIndex = 0;

export const addTodo = text => {
  return {
    type: types.ADD_TODO,
    id: latestTodoId++,
    index: latestTodoIndex++,
    text,
  };
};
