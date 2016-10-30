import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Inbox from '../components/Inbox';

import * as TodoActions from '../actions';

const App = ({ actions, completedTodos, uncompletedTodos }) => (
  <div>
    <Header title="Inbox" />
    <Inbox actions={actions} completedTodos={completedTodos} uncompletedTodos={uncompletedTodos} />
  </div>
);

App.propTypes = {
  completedTodos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

const mapStateToProps = state => (console.log(state), {
  completedTodos: state.todos.completed,
  uncompletedTodos: state.todos.uncompleted,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
