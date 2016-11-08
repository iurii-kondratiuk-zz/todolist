import * as types from '../constants/ActionTypes';

const initialState = {
  accessToken: null,
  code: null,
};

export default function todos(state = initialState, action) {

  switch(action.type) {

    case types.SET_CODE:
      return {
        ...state,
        code: action.code,
      }

    default:
      return state;
  }
};

