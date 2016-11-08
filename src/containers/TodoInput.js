import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Input from '../components/Input';

import * as TodoActions from '../actions/todo';

const TodoInput = ({ actions }) => (
  <Input
  	onSave={actions.addTodo}
    placeholder="Add a to-do..."
  />
);

TodoInput.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps
)(TodoInput);
