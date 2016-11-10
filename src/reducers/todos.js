import * as types from '../constants/ActionTypes';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  activeListId: null,
  completed: [],
  completedTodosAreVisible: false,
  inbox: [],
  todosById: {},
};

let latestTodoId = 0;

export default function todos(state = initialState, action) {

  switch(action.type) {

    case types.ADD_TODO:
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        inbox: [...state.inbox, action.todo.id]
      }

    case types.COMPLETE_TODO:
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        completed: [action.todo.id, ...state.completed],
        inbox: state.inbox.filter(id => id !== action.todo.id)
      }

    case types.RECEIVE_TODOS:
      const { listId, todos } = action.todos;
      const ids = todos.map(todo => todo.id);
      const todosById = todos.reduce((acc, todo) =>  ({ ...acc, [todo.id]: todo }), {});
      const todosType = action.completed ? 'completed' : 'inbox';

      return {
        ...state,
        activeListId: listId,
        [todosType]: ids,
        todosById: {
          ...state.todosById,
          ...todosById,
        },
      };

    case types.UNCOMPLETE_TODO:
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        inbox: [...state.inbox, action.todo.id],
        completed: state.completed.filter(id => id !== action.todo.id)
      }

    case types.TOGGLE_COMPLETED_TODOS:
      return {
        ...state,
        completedTodosAreVisible: !state.completedTodosAreVisible,
      }

    case types.SWAP_TODOS:
      return {
        ...state,
        inbox: arrayMove(state.inbox, action.oldIndex, action.newIndex),
      }

    default:
      return state;
  }
};

