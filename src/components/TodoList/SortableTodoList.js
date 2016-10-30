import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import TodoList from './TodoList';

const SortableTodoListWrapper = SortableContainer(TodoList);

const SortableTodoList = ({ children, onSort }) => (
  <SortableTodoListWrapper distance={1}
                           onSortEnd={onSort}
                            useDragHandle={true}>
    {children}
  </SortableTodoListWrapper>
);

SortableTodoList.propTypes = {
  children: React.PropTypes.node,
  onSort: React.PropTypes.func,
};

export default SortableContainer(SortableTodoList);
