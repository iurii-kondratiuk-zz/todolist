import React from 'react';

import Todo from './Todo';

const Inbox = ({ todos }) => {
	return (
		<ul className="Inbox">
			{
				todos.map(todo => (
					<Todo
						completed={todo.completed}
						key={todo.index}
						text={todo.text}
					/>
				))
			}
		</ul>
	);
};

Inbox.propTypes = {
	todos: React.PropTypes.array,
}

export default Inbox;
