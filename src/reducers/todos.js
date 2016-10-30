import * as types from '../constants/ActionTypes';
import { arrayMove } from 'react-sortable-hoc';

import { moveAndUpdate } from '../utils';

const initialState = {
  completed: [],
  uncompleted: [],
};

export default function todos(state = initialState, action) {

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
      return moveAndUpdate(state, action.id, 'uncompleted', 'completed', { completed: true });

    case types.UNCOMPLETE_TODO:
      return moveAndUpdate(state, action.id, 'completed', 'uncompleted', { completed: false });

    case types.SWAP_TODOS:
      return {
        ...state,
        uncompleted: arrayMove(state.uncompleted, action.oldIndex, action.newIndex),
      }

    default:
      return state;
  }
};

