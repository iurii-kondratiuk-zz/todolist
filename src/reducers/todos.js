import * as types from '../constants/ActionTypes';

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

  	default:
      return state;
  }
};

