import reducer from '../reducers/todos';
import * as types from '../constants/ActionTypes';

describe('todos reducer', () => {

  const initialState = {
    activeListId: null,
    completed: [],
    completedTodosAreVisible: false,
    inbox: [],
    todoPositionsRevision: null,
    todosById: {},
  };


  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_TODO action', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TODO,
        todo: {
          id: 1,
          title: 'my first to-do',
        },
        todoPositions: { revision: 1, values: [1]},
      })
    ).toEqual({
      ...initialState,
      todosById: {
        1: {
          title: 'my first to-do',
          id: 1
        }
      },
      inbox: [1],
      todoPositionsRevision: 1,
    });
  });

  it('should handle COMPLETE_TODO action', () => {
    const todo = { id: 1, text: 'to-do' };
    const state = {
      ...initialState,
      todosById: { 1: todo },
      inbox: [1],
    };
    
    expect(
      reducer(state, {
        type: types.COMPLETE_TODO,
        todo: { ...todo, completed: true },
        todoPositions: { revision: 1, values: []},
      })
    ).toEqual({
      ...initialState,
      todosById: {
        1: { ...todo, completed: true },
      },
      completed: [1],
      inbox: [],
      todoPositionsRevision: 1,
    });
  });

  it('should handle RECEIVE_TODOS action for completed to-dos', () => {
    expect(
      reducer(initialState, {
        type: types.RECEIVE_TODOS,
        completed: true,
        listId: 1,
        todos: [{ id: 1 }, { id: 2 }],
      })
    ).toEqual({
      ...initialState,
      activeListId: 1,
      completed: [1, 2],
      todosById: {
        1: { id: 1 },
        2: { id: 2 },
      },
    });
  });

  it('should handle RECEIVE_TODOS action for uncompleted to-dos', () => {
    expect(
      reducer(initialState, {
        type: types.RECEIVE_TODOS,
        listId: 1,
        todoPositions: {
          revision: 1,
          values: [2, 1],
        },
        todos: [{ id: 1 }, { id: 2 }],
      })
    ).toEqual({
      ...initialState,
      activeListId: 1,
      inbox: [2, 1],
      todoPositionsRevision: 1,
      todosById: {
        1: { id: 1 },
        2: { id: 2 },
      },
    });
  });

  it('should handle UNCOMPLETE_TODO action', () => {
    const todo = { id: 1, text: 'to-do', completed: true };
    const state = {
      ...initialState,
      todosById: { 1: todo },
      completed: [1],
    };
    
    expect(
      reducer(state, {
        type: types.UNCOMPLETE_TODO,
        todo,
        todoPositions: { revision: 1, values: [1]},
      })
    ).toEqual({
      ...initialState,
      todosById: {
        1: { ...todo },
      },
      completed: [],
      inbox: [1],
      todoPositionsRevision: 1,
    });
  });

  it('should handle TOGGLE_COMPLETED_TODOS action', () => {
    expect(
      reducer(initialState, { type: types.TOGGLE_COMPLETED_TODOS })
    ).toEqual({
      ...initialState,
      completedTodosAreVisible: true,
    });
  });

  it('should handle UPDATE_TODO_POSITIONS action', () => {
    const state = {
      ...initialState,
      inbox: [1, 2],
      todoPositionsRevision: 0,
    };
    
    expect(
      reducer(state, {
        type: types.UPDATE_TODO_POSITIONS,
        revision: 1,
        values: [2, 1],
      })
    ).toEqual({
      ...initialState,
      inbox: [2, 1],
      todoPositionsRevision: 1,
    });
  });
});
