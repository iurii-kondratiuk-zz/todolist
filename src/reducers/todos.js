import * as types from '../constants/ActionTypes';

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
      const { completed, listId, todoPositions, todos } = action;

      const ids = completed ? todos.map(todo => todo.id) : todoPositions.values;
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

