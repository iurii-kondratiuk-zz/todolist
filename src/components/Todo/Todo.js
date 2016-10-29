import React from 'react';

import './Todo.css';

class Todo extends React.Component {
	static propTypes = {
		todo: React.PropTypes.object,
		onComplete: React.PropTypes.func,
	}

	handleCheckboxChange = e => {
		const { onComplete, todo } = this.props;
		onComplete(todo.id);
	}

	render() {
		const { todo } = this.props;
		console.log('Todo', todo)
		return (
			<li className="Todo">
				<input type="checkbox"
							 value={todo.completed}
							 defaultChecked={false}
							 onChange={this.handleCheckboxChange} />
				<span>{todo.text}</span>
			</li>
		);
	}
}

export default Todo;
