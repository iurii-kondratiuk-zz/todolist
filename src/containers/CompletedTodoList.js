import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../components/Button';
import { Todo } from '../components/Todo';
import { TodoList } from '../components/TodoList';

import * as TodoActions from '../actions';

class CompletedTodoList extends React.Component {

  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
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
        <Button disabled={!todos.length}
                onClick={this.toggleTodos}
                text={`${todos.length && showTodos ? 'HIDE' : 'SHOW'} COMPLETED TO-DOs`} />
        {
          showTodos && (
            <TodoList>
              {
                todos.map((todo, index) => (
                  <Todo index={index}            
                        key={index}
                        onComplete={actions.uncompleteTodo}
                        todo={todo} />
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
  todos: state.todos.completed,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTodoList);
