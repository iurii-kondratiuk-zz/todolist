import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO } from '../constants/ActionTypes';

let latestTodoId = 0;
let latestTodoIndex = 0;

export const addTodo = text => {
  return {
    type: ADD_TODO,
    id: latestTodoId++,
    index: latestTodoIndex++,
    text,
  };
};
