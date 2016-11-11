import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../components/Button';
import { Todo } from '../components/Todo';
import { TodoList } from '../components/TodoList';

import { getTodos } from '../utils';

import * as TodoActions from '../actions';

class CompletedTodoList extends React.Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.actions.fetchTodos({ completed: true });
  }

  onUncomplete = todo => {
    const { actions, activeListId, inbox, todoPositionsRevision } = this.props;
    actions.uncompleteTodo(todo, activeListId, inbox, todoPositionsRevision);
  }

  render() {
    const { actions, isFetching, showTodos, todoInProcess, todos } = this.props;
    let buttonLabel = !!todos.length && showTodos ? 'HIDE' : 'SHOW';
    buttonLabel = isFetching ? 'LOADING' : buttonLabel;

    return (
      <div>
        <Button
          disabled={!todos.length}
          onClick={actions.toggleCompletedTodos}
          text={`${buttonLabel} COMPLETED TO-DOS`}
        />
        {
          showTodos && (
            <TodoList>
              {
                todos.map((todo, index) => (
                  <Todo
                    index={index}            
                    inProcess={todoInProcess === todo.id}
                    key={todo.id}
                    onComplete={this.onUncomplete}
                    todo={todo}
                  />
                ))
              }
            </TodoList>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeListId: state.todos.activeListId,
  inbox: state.todos.inbox,
  isFetching: state.fetching.completed,
  showTodos: state.todos.completedTodosAreVisible,
  todoInProcess: state.fetching.todo,
  todos: getTodos(state.todos, 'completed'),
  todoPositionsRevision: state.todos.todoPositionsRevision,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTodoList);
