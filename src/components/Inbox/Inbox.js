import React from 'react';

import TodoInput from '../../containers/TodoInput';
import CompletedTodoList from '../../containers/CompletedTodoList';
import UncompletedTodoList from '../../containers/UncompletedTodoList';

const Inbox = () => (
  <div className="Inbox">
    <TodoInput />
    <UncompletedTodoList />
    <CompletedTodoList />
  </div>
);

export default Inbox;
