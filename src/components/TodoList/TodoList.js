import React, { PropTypes } from 'react';

import './TodoList.css';

const TodoList = ({ children }) => (
  <ul className="TodoList">
    {children}
  </ul>
);

TodoList.propTypes = {
  children: PropTypes.node,
};

export default TodoList;
