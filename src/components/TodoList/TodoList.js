import React from 'react';

import Todo from '../Todo';

import './TodoList.css';

const TodoList = ({ todos }) => (
	<ul className="TodoList">
    {
      todos.map(todo => (
        <Todo
          completed={todo.completed}
          key={todo.index}
          text={todo.text}
        />
      ))
    }
  </ul>
);

export default TodoList;
