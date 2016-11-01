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

  state = {
    showTodos: false,
  }

  toggleTodos = () => this.setState({ showTodos: !this.state.showTodos });

  render() {
    const { actions, todos } = this.props;
    const { showTodos } = this.state;
    
    return (
      <div>
        <Button
          disabled={!todos.length}
          onClick={this.toggleTodos}
          text={`${!!todos.length && showTodos ? 'HIDE' : 'SHOW'} COMPLETED TO-DOS`}
        />
        {
          showTodos && (
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
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: getTodos(state.todos, 'completed'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTodoList);
