import * as types from '../constants/ActionTypes';
import { arrayMove } from 'react-sortable-hoc';

//const initialState = [];

const initialState = {
  completed: [],
  uncompleted: [],
};

const getTodoAndRest = (todos, id) => {
  const todo = todos.filter(t => t.id === id);
  const rest = todos.filter(t => t.id !== id);
  return todo.concat([rest]);
}

export default function todos(state = initialState, action) {

  console.log(action)
  switch(action.type) {

    case types.ADD_TODO:
      return {
        ...state,
        uncompleted: state.uncompleted.concat([{
          completed: false,
          id: action.id,
          index: action.index,
          text: action.text,
        }])
      }

    case types.COMPLETE_TODO:
      const [uncompletedTodo, uncompletedRest] = getTodoAndRest(state.uncompleted, action.id);
      return {
        uncompleted: uncompletedRest,
        completed: state.completed.concat([{ ...uncompletedTodo, completed: true }]),
      }

    case types.UNCOMPLETE_TODO:
      const [completedTodo, completedRest] = getTodoAndRest(state.completed, action.id);
      return {
        completed: completedRest,
        uncompleted: state.uncompleted.concat([{ ...completedTodo, completed: false }]),
      }

    case types.SWAP_TODOS:
      return {
        ...state,
        uncompleted: arrayMove(state.uncompleted, action.oldIndex, action.newIndex),
      }

    default:
      return state;
  }
};

