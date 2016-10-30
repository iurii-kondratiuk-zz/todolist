import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Todo } from '../components/Todo';
import { TodoList } from '../components/TodoList';

import * as TodoActions from '../actions';

const CompletedTodoList = ({ actions, todos }) => (
  <TodoList>
    {
      todos.map((todo, index) => (
        <Todo
          index={index}            
          key={index}
          onComplete={actions.uncompleteTodo}
          todo={todo}
        />
      ))
    }
  </TodoList>
);

CompletedTodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos.completed,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTodoList);
