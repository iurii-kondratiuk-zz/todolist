export const getTodos = (todos, from) => {
	return todos[from].map(id => todos.todosById[id]);
}
