import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SortableTodo } from '../components/Todo';
import { SortableTodoList } from '../components/TodoList';

import * as TodoActions from '../actions';

const UnompletedTodoList = ({ actions, todos }) => (
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
);

UnompletedTodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos.uncompleted,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnompletedTodoList);
