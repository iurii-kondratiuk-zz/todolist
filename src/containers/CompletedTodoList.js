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

  onUncomplete = todo => this.props.actions.uncompleteTodo(todo);

  render() {
    const { actions, isFetching, showTodos, todoInProcess, todos } = this.props;
    const buttonLabel = isFetching
      ? 'LOADING'
      : !!todos.length && showTodos
        ? 'HIDE'
        : 'SHOW';

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
  todos: getTodos(state.todos, 'completed'),
  showTodos: state.todos.completedTodosAreVisible,
  isFetching: state.todos.isFetching.completed,
  todoInProcess: state.todos.isFetching.todo,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTodoList);
