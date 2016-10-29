import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Todo from '../Todo';

import './TodoList.css';

class TodoList extends React.Component {

  moveCard(dragIndex, hoverIndex) {
    console.log(dragIndex, hoverIndex)
  }

  render() {
    const { actions, todos } = this.props;

    return  (
      <ul className="TodoList">
        {
          todos.map(todo => (
            <Todo
              index={todo.index}
              key={todo.index}
              onComplete={actions.completeTodo}
              todo={todo}
              moveCard={actions.swapTodos}
            />
          ))
        }
      </ul>
    );
  }
};

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default DragDropContext(HTML5Backend)(TodoList);
