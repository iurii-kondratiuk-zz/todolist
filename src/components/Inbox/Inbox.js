import React from 'react';

import TodoInput from '../TodoInput';
import TodoList from '../TodoList';

import './Inbox.css';

const eventOnCheckbox = e => e.target.className.indexOf('Checkbox') >= 0;

const Inbox = ({ todos, actions }) => (
  <div className="Inbox">
    <TodoInput onSave={actions.addTodo} />
    <TodoList
    	actions={actions}
    	todos={todos}
    	shouldCancelStart={eventOnCheckbox}
    	onSortEnd={actions.swapTodos}
    />
  </div>
);

Inbox.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default Inbox;
