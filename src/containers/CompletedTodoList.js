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
    this.props.dispatch(TodoActions.fetchTodos({ completed: true }));
  }

  render() {
    const { actions, showTodos, todos } = this.props;

    return (
      <div>
        <Button
          disabled={!todos.length}
          onClick={actions.toggleCompletedTodos}
          text={`${!!todos.length && showTodos ? 'HIDE' : 'SHOW'} COMPLETED TO-DOS`}
        />
        {
          showTodos && (
            <TodoList>
              {
                todos.map((todo, index) => (
                  <Todo
                    index={index}            
                    key={todo.id}
                    onComplete={actions.uncompleteTodo}
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
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTodoList);
