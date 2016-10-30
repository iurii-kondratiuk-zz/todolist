import React from 'react';

import { SortableTodo } from '../Todo';
import TodoInput from '../TodoInput';
import { SortableTodoList } from '../TodoList';

import './Inbox.css';

const Inbox = ({ todos, actions }) => (
  <div className="Inbox">
    <TodoInput onSave={actions.addTodo} />
    <SortableTodoList onSort={actions.swapTodos}>
      {
        todos.map((todo, index) => (
          <SortableTodo
            index={index}            
            key={index}
            onComplete={actions.completeTodo}
            todo={todo}
          />
        ))
      }
    </SortableTodoList>
  </div>
);

Inbox.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default Inbox;
