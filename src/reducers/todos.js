import * as types from '../constants/ActionTypes';
import { arrayMove } from 'react-sortable-hoc';

//const initialState = [];

const initialState = {
  completed: [],
  uncompleted: [],
};

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
      const todo = state.uncompleted.filter(t => t.id === action.id)[0];
      const rest = state.uncompleted.filter(t => t.id !== action.id);
      return {
        uncompleted: rest,
        completed: state.completed.concat([{ ...todo, completed: true }]),
      }

    case types.UNCOMPLETE_TODO:
      const todoA = state.completed.filter(t => t.id === action.id)[0];
      const restA = state.completed.filter(t => t.id !== action.id);
      return {
        completed: restA,
        uncompleted: state.uncompleted.concat([{ ...todoA, completed: false }]),
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

