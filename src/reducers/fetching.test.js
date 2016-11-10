import reducer from '../reducers/fetching';
import * as types from '../constants/ActionTypes';

describe('fetching reducer', () => {

  const initialState = {
    inbox: true,
    completed: true,
    todo: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  
  it('should handle COMPLETE_TODO action', () => {
    const state = {
      ...initialState,
      todo: 1,
    };
    
    expect(
      reducer(state, { type: types.COMPLETE_TODO })
    ).toEqual({ ...initialState, todo: null });
  });

  it('should handle UNCOMPLETE_TODO action', () => {
    const state = {
      ...initialState,
      todo: 1,
    };
    
    expect(
      reducer(state, { type: types.UNCOMPLETE_TODO})
    ).toEqual({ ...initialState, todo: null });
  });

  it('should handle REQUEST_TODO_UPDATE action', () => {
    const state = initialState;
    
    expect(
      reducer(state, { type: types.REQUEST_TODO_UPDATE, id: 1 })
    ).toEqual({ ...initialState, todo: 1 });
  });

  it('should handle RECEIVE_TODOS action for completed to-dos', () => {
    const state = initialState;
    
    expect(
      reducer(state, { type: types.RECEIVE_TODOS, completed: true })
    ).toEqual({ ...initialState, completed: false });
  });

  it('should handle RECEIVE_TODOS action for completed to-dos', () => {
    const state = initialState;
    
    expect(
      reducer(state, { type: types.RECEIVE_TODOS })
    ).toEqual({ ...initialState, inbox: false });
  });

  it('should handle REQUEST_TODOS action for completed to-dos', () => {
    const state = {
      ...initialState,
      completed: false,
    };
    
    expect(
      reducer(state, { type: types.REQUEST_TODOS, completed: true })
    ).toEqual({ ...initialState, completed: true });
  });

  it('should handle REQUEST_TODOS action for completed to-dos', () => {
    const state = {
      ...initialState,
      inbox: false,
    };
    
    expect(
      reducer(state, { type: types.REQUEST_TODOS })
    ).toEqual({ ...initialState, inbox: true });
  });
});
