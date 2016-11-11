import * as types from '../constants/ActionTypes';
import { filterWith } from '../utils';

const initialState = {
  activeListId: null,
  completed: [],
  completedTodosAreVisible: false,
  inbox: [],
  todoPositionsRevision: null,
  todosById: {},
};

export default function todos(state = initialState, action) {
  switch(action.type) {

    case types.ADD_TODO:
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        inbox: action.todoPositions.values,
        todoPositionsRevision: action.todoPositions.revision,
      }

    case types.COMPLETE_TODO:
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        completed: [action.todo.id, ...state.completed],
        inbox: action.todoPositions.values,
        todoPositionsRevision: action.todoPositions.revision,
      }

    case types.RECEIVE_TODOS:
      const { completed, listId, todoPositions, todos } = action;

      let ids = todos.map(todo => todo.id);
      // make sure that we have correct to-dos in positions
      ids = todoPositions ? filterWith(todoPositions.values, ids) : ids;

      const todosById = todos.reduce((acc, todo) =>  ({ ...acc, [todo.id]: todo }), {});
      const todosType = completed ? 'completed' : 'inbox';

      return {
        ...state,
        activeListId: listId,
        [todosType]: ids,
        ...(completed ? {} : { todoPositionsRevision: todoPositions.revision }),
        todosById: {
          ...state.todosById,
          ...todosById,
        },
      };

    case types.TOGGLE_COMPLETED_TODOS:
      return {
        ...state,
        completedTodosAreVisible: !state.completedTodosAreVisible,
      }

    case types.UNCOMPLETE_TODO:
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.todo.id]: action.todo,
        },
        inbox: action.todoPositions.values,
        todoPositionsRevision: action.todoPositions.revision,
        completed: state.completed.filter(id => id !== action.todo.id)
      }

    case types.UPDATE_TODO_POSITIONS:
      const { revision, values } = action;
      return {
        ...state,
        inbox: values,
        todoPositionsRevision: revision,
      }

    default:
      return state;
  }
};

