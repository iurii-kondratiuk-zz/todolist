import React from 'react';

import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

import './Inbox.css';

const Inbox = ({ todos, actions }) => (
	<div className="Inbox">
		<TodoInput onSave={actions.addTodo} />
	  <TodoList todos={todos} />
  </div>
);

Inbox.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default Inbox;
