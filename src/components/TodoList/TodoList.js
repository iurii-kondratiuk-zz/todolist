import React from 'react';

import './TodoList.css';

const TodoList = ({ children }) => (
  <ul className="TodoList">{children}</ul>
);

TodoList.propTypes = {
  children: React.PropTypes.node,
};

export default TodoList;
