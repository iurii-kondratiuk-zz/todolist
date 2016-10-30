import React from 'react';
import classnames from 'classnames';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import Checkbox from '../Checkbox';
import DragHandle from '../DragHandle';

import './Todo.css';

const Todo = ({ onComplete, todo }) => (
  <li className={classnames('Todo', {'Todo--completed': todo.completed })}>
    <Checkbox checked={todo.completed} onChange={() => onComplete(todo.id)} />
    <DragHandle>
    	<span>{todo.text}</span>
    </DragHandle>
  </li>
);

Todo.propTypes = {
  onComplete: React.PropTypes.func,
  todo: React.PropTypes.object,
};

export default SortableElement(Todo);
