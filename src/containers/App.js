import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TodoInput from '../components/TodoInput';
import Inbox from '../components/Inbox';
import * as TodoActions from '../actions';

const App = ({ todos, actions }) => (
  <div>
    <TodoInput onSave={actions.addTodo} />
    <Inbox todos={todos} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)