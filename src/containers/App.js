import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Inbox from '../components/Inbox';

import * as TodoActions from '../actions';

const App = ({ todos, actions }) => (
  <div>
    <Header title="Inbox" />
    <Inbox actions={actions} todos={todos} />
  </div>
);

App.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
