import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Checkbox from '../Checkbox';

const Todo = ({ onComplete, inProcess, todo }) => (
  <li className={classnames('Todo', { 'Todo--completed': todo.completed })}>
  	{
  		inProcess
  			? <div className="Todo-loading" />
  			: (
			  	<Checkbox
			    	checked={todo.completed}
			      onChange={() => onComplete(todo)}
			    />
  			)
  	}
    <span className="Todo-text">{todo.title}</span>
  </li>
);

Todo.propTypes = {
  onComplete: PropTypes.func,
  todo: PropTypes.object,
};

export default Todo;
