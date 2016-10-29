import React from 'react';

import Todo from '../components/Todo';

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
