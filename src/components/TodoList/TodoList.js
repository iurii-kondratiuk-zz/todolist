import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import Todo from '../Todo';

import './TodoList.css';

const TodoList = ({ actions, todos }) => (
  <ul className="TodoList">
    {
      todos.map((todo, index) => (
        <Todo
          index={index}            
          key={index}
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

export default SortableContainer(TodoList);
