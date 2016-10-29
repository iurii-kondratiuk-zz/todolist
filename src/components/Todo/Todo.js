import React from 'react';
import classnames from 'classnames';

import Checkbox from '../Checkbox';

import './Todo.css';

class Todo extends React.Component {
	static propTypes = {
		todo: React.PropTypes.object,
		onComplete: React.PropTypes.func,
	}

	handleCheckboxChange = e => {
		const { onComplete, todo } = this.props;
		console.log(todo)
		onComplete(todo.id);
	}

	render() {
		const { todo } = this.props;
		console.log('Todo', todo)
		return (
			<li className={classnames('Todo', { 'Todo--completed': todo.completed })}>
				<Checkbox checked={todo.completed} onChange={this.handleCheckboxChange} />
				<span>{todo.text}</span>
			</li>
		);
	}
}

export default Todo;
