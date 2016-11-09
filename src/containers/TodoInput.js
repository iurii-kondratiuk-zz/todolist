import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Input from '../components/Input';

import * as TodoActions from '../actions';

class TodoInput extends React.Component {

	static propTypes = {
	  actions: PropTypes.object.isRequired,
	}

	onSave = title => {
		const { actions, listId } = this.props;
		actions.addTodo(listId, title);
	}

	render() {
		return (
			<Input
		  	onSave={this.onSave}
		    placeholder="Add a to-do..."
		  />
		);
	}
}

const mapStateToProps = state => ({
  listId: state.todos.activeListId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInput);
