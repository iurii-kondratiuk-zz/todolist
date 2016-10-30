import React from 'react';

import { SortableTodo, Todo } from '../Todo';
import TodoInput from '../TodoInput';
import { SortableTodoList, TodoList } from '../TodoList';

import './Inbox.css';

const Inbox = ({ actions, completedTodos, uncompletedTodos }) => (
  <div className="Inbox">
    <TodoInput onSave={actions.addTodo} />
    <SortableTodoList onSort={actions.swapTodos}>
      {
        uncompletedTodos.map((todo, index) => (
          <SortableTodo
            index={index}            
            key={index}
            onComplete={actions.completeTodo}
            todo={todo}
          />
        ))
      }
    </SortableTodoList>
    <div />
    <TodoList>
      {
        completedTodos.map((todo, index) => (
          <Todo
            index={index}            
            key={index}
            onComplete={actions.uncompleteTodo}
            todo={todo}
          />
        ))
      }
    </TodoList>
  </div>
);

Inbox.propTypes = {
  completedTodos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default Inbox;
