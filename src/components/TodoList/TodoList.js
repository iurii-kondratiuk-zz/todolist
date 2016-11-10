import React, { PropTypes } from 'react';

const TodoList = ({ children, isFetching }) => (
  <ul className="TodoList">
    {
      isFetching
        ? <div className="TodoList-loading">TO-DOs are loading...</div>
        : children
    }
  </ul>
);

TodoList.propTypes = {
  children: PropTypes.node,
  isFetching: PropTypes.bool,
};

export default TodoList;
