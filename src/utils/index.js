export const getTodos = (todos, from) => {
	return todos[from].map(id => todos.todosById[id]);
}

export const filterWith = (a, b) => a.filter(i => b.indexOf(i) >= 0);
