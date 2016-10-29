import React from 'react';

import './Todo.css';

const Todo = ({ completed, text }) => (
	<li className="Todo">
		<span>{completed}</span>
		<span>{text}</span>
	</li>
);

Todo.propTypes = {
	completed: React.PropTypes.bool,
	text: React.PropTypes.string,
}

export default Todo;
