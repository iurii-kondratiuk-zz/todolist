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

    case types.COMPLETE_TODO:
      return state.map(todo => (
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      ))

    case types.SWAP_TODOS:
      return state.map(todo => {
        if (todo.index === action.sourceIndex) return { ...todo, index: action.targetIndex};
        if (todo.index === action.targetIndex) return { ...todo, index: action.sourceIndex};
        return todo;
      })

  	default:
      return state;
  }
};

