import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SortableTodo } from '../components/Todo';
import { SortableTodoList } from '../components/TodoList';

import { getTodos } from '../utils';

import * as TodoActions from '../actions';

class UnompletedTodoList extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchTodos({ completed: false });
  }

  onComplete = todo => this.props.actions.completeTodo(todo);

  render() {
    const { actions, isFetching, todos } = this.props;
    console.log('inbox', isFetching)
    return (
      <SortableTodoList
        isFetching={isFetching}
        onSort={actions.swapTodos}
      >
        {
          todos.map((todo, index) => (
            <SortableTodo
              index={index}            
              key={todo.id}
              onComplete={this.onComplete}
              todo={todo}
            />
          ))
        }
      </SortableTodoList>
    );
  }
};

const mapStateToProps = state => ({
  todos: getTodos(state.todos, 'inbox'),
  isFetching: state.todos.isFetching.inbox,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnompletedTodoList);
