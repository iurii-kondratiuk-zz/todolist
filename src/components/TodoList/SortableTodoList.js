import React, { PropTypes } from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import TodoList from './TodoList';

const SortableTodoListWrapper = SortableContainer(TodoList);

const SortableTodoList = ({ children, isFetching, onSort }) => (
  <SortableTodoListWrapper
    distance={1}
    isFetching={isFetching}
    onSortEnd={onSort}
    useDragHandle={true}
  >
    {children}
  </SortableTodoListWrapper>
);

SortableTodoList.propTypes = {
  children: PropTypes.node,
  isFetching: PropTypes.bool,
  onSort: PropTypes.func,
};

export default SortableContainer(SortableTodoList);
