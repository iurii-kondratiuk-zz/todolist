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
  onSwap = indexes => {
    const { actions, activeListId, inbox, todoPositionsRevision } = this.props;
    actions.swapTodos(inbox, activeListId, todoPositionsRevision, indexes);
  }

  render() {
    const { actions, isFetching, todoInProcess, todos } = this.props;

    return (
      <SortableTodoList
        isFetching={isFetching}
        onSort={this.onSwap}
      >
        {
          todos.map((todo, index) => (
            <SortableTodo
              index={index}   
              inProcess={todoInProcess === todo.id}         
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

const mapStateToProps = ({ fetching, todos }) => ({
  activeListId: todos.activeListId,
  inbox: todos.inbox,
  isFetching: fetching.inbox,
  todos: getTodos(todos, 'inbox'),
  todoInProcess: fetching.todo,
  todoPositionsRevision: todos.todoPositionsRevision,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnompletedTodoList);
