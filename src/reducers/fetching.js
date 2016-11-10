import * as types from '../constants/ActionTypes';

const initialState = {
  inbox: true,
  completed: true,
  todo: null,
};

export default function todos(state = initialState, action) {

  switch(action.type) {

    case types.COMPLETE_TODO:
      return {
        ...state,
        todo: null,
      }

    case types.RECEIVE_TODOS:
      return {
        ...state,
        [action.completed ? 'completed' : 'inbox']: false
      };

    case types.REQUEST_TODOS:
      return {
        ...state,
        [action.completed ? 'completed' : 'inbox']: true,
      };

    case types.REQUEST_TODO_UPDATE:
      return {
        ...state,
        todo: action.id,
      };

    case types.UNCOMPLETE_TODO:
      return {
        ...state,
        todo: null,
      }

    default:
      return state;
  }
};

