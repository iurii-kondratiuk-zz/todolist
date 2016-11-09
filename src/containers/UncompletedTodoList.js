import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SortableTodo } from '../components/Todo';
import { SortableTodoList } from '../components/TodoList';

import { getTodos } from '../utils';

import * as TodoActions from '../actions';

class UnompletedTodoList extends React.Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchTodos({ completed: false });
  }

  render() {
    const { actions, todos } = this.props;
    console.log(todos)
    return (
      <SortableTodoList onSort={actions.swapTodos}>
        {
          todos.map((todo, index) => (
            <SortableTodo
              index={index}            
              key={todo.id}
              onComplete={actions.completeTodo}
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
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnompletedTodoList);
