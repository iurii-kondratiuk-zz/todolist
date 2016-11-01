import reducer from '../reducers/todos';
import * as types from '../constants/ActionTypes';

describe('todos reducer', () => {

  const initialState = {
    todosById: {},
    completed: [],
    inbox: [],
    completedTodosAreVisible: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_TODO action', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TODO,
        text: 'my first to-do',
      })
    ).toEqual({
      ...initialState,
      todosById: {
        0: {
          text: 'my first to-do',
          completed: false,
          id: 0
        }
      },
      inbox: [0],
    });
  });

  it('should handle COMPLETE_TODO action', () => {
    const todo = { id: 1, text: 'to-do' };
    const state = {
      ...initialState,
      todosById: {
        1: { id: 1, text: 'to-do' }
      },
      inbox: [1],
    };
    
    expect(
      reducer(state, {
        type: types.COMPLETE_TODO,
        id: 1,
      })
    ).toEqual({
      ...initialState,
      todosById: {
        1: { id: 1, text: 'to-do', completed: true }
      },
      completed: [1],
      inbox: [],
    });
  });

  it('should handle UNCOMPLETE_TODO action', () => {
    const todo = { id: 1, text: 'to-do' };
    const state = {
      ...initialState,
      todosById: {
        1: { id: 1, text: 'to-do' }
      },
      completed: [1],
    };
    
    expect(
      reducer(state, {
        type: types.UNCOMPLETE_TODO,
        id: 1,
      })
    ).toEqual({
      ...initialState,
      todosById: {
        1: { id: 1, text: 'to-do', completed: false }
      },
      completed: [],
      inbox: [1],
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

  it('should handle SWAP_TODOS action', () => {
    const state = {
      ...initialState,
      inbox: [1, 2],
    };
    
    expect(
      reducer(state, {
        type: types.SWAP_TODOS,
        oldIndex: 0,
        newIndex: 1,
      })
    ).toEqual({
      ...initialState,
      inbox: [2, 1],
    });
  });
});
