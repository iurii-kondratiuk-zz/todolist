import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import Todo from './Todo';
import DragHandle from '../DragHandle';

const SortableTodo = ({ onComplete, todo }) => (
  <DragHandle>
	  <Todo onComplete={onComplete} todo={todo} />
  </DragHandle>
);

SortableTodo.propTypes = {
  onComplete: React.PropTypes.func,
  todo: React.PropTypes.object,
};

export default SortableElement(SortableTodo);
