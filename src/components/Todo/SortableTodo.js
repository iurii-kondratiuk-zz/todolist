import React, { PropTypes } from 'react';
import { SortableElement } from 'react-sortable-hoc';

import Todo from './Todo';
import DragHandle from '../DragHandle';

const SortableTodo = ({ onComplete, inProcess, todo }) => (
  <DragHandle>
    <Todo
    	inProcess={inProcess}
    	onComplete={onComplete}
      todo={todo}
    />
  </DragHandle>
);

SortableTodo.propTypes = {
  onComplete: PropTypes.func,
  todo: PropTypes.object,
};

export default SortableElement(SortableTodo);
