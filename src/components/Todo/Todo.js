import React from 'react';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import Checkbox from '../Checkbox';

import './Todo.css';



const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const x = DropTarget('todo', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}));

const y = DragSource('todo', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}));

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
		const { todo, isDragging, connectDragSource, connectDropTarget } = this.props;

		return connectDragSource(connectDropTarget(
      <li className={classnames('Todo', { 'Todo--completed': todo.completed })}>
				<Checkbox checked={todo.completed} onChange={this.handleCheckboxChange} />
				<span>{todo.text}</span>
			</li>
    ));
	}
}

export default y(x(Todo));

