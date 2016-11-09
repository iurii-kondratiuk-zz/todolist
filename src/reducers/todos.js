import * as types from '../constants/ActionTypes';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  activeListId: null,
  completed: [],
  completedTodosAreVisible: false,
  isFetching: {
    inbox: true,
    completed: true,
    todo: null,
  },
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
        isFetching: {
          ...state.isFetching,
          todo: null,
        },
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        completed: [...state.completed, action.todo.id],
        inbox: state.inbox.filter(id => id !== action.todo.id)
      }

    case types.RECEIVE_TODOS:
      const { listId, tasks } = action.todos;
      const ids = tasks.map(todo => todo.id);
      const todosById = tasks.reduce((acc, todo) =>  ({ ...acc, [todo.id]: todo }), {});
      const todosType = action.completed ? 'completed' : 'inbox';

      return {
        ...state,
        activeListId: listId,
        [todosType]: ids,
        todosById: {
          ...state.todosById,
          ...todosById,
        },
        isFetching: {
          ...state.isFetching,
          [todosType]: false
        }
      };

    case types.REQUEST_TODOS:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.completed ? 'completed' : 'inbox']: true,
        },
      };

    case types.REQUEST_TODO_UPDATE:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          todo: action.id,
        },
      };

    case types.UNCOMPLETE_TODO:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          todo: null,
        },
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

