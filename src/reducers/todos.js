import * as types from '../constants/ActionTypes';
import { arrayMove } from 'react-sortable-hoc';

const initialState = [];

export default function todos(state = initialState, action) {
  console.log(action)
  switch(action.type) {

    case types.ADD_TODO:
      return [
        {
          completed: false,
          id: action.id,
          index: action.index,
          text: action.text,
        },
        ...state
      ]

    case types.COMPLETE_TODO:
      return state.map(todo => (
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      ))

    case types.SWAP_TODOS:
      return arrayMove(state, action.oldIndex, action.newIndex);

    default:
      return state;
  }
};

