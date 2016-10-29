import React from 'react';

import Todo from '../Todo';

import './TodoList.css';

const TodoList = ({ todos, actions }) => (
	<ul className="TodoList">
    {
      todos.map(todo => (
        <Todo
          key={todo.id}
          onComplete={actions.completeTodo}
          todo={todo}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default TodoList;
