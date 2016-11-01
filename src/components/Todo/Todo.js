import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Checkbox from '../Checkbox';

import './Todo.css';

const Todo = ({ onComplete, todo }) => (
  <li className={classnames('Todo', { 'Todo--completed': todo.completed })}>
    <Checkbox
    	checked={todo.completed}
      onChange={() => onComplete(todo.id)}
     />
    <span>{todo.text}</span>
  </li>
);

Todo.propTypes = {
  onComplete: PropTypes.func,
  todo: PropTypes.object,
};

export default Todo;
