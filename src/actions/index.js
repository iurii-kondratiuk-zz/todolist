let latestTodoId = 0;
let latestTodoIndex = 0;

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: latestTodoId++,
    index: latestTodoIndex++,
    text,
  };
};
