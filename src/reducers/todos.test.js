import reducer from '../reducers/todos';
import * as types from '../constants/ActionTypes';

describe('todos reducer', () => {

  it('should return the initial state', () => {
    const initialState = { completed: [], uncompleted: [] };
    
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle ADD_TODO action', () => {
    const initialState = { completed: [], uncompleted: [] };
    
    expect(
      reducer(initialState, {
        type: types.ADD_TODO,
        text: 'my first to-do',
      })
    ).toEqual({
      ...initialState,
      uncompleted: [
        {
          text: 'my first to-do',
          completed: false,
          id: 0
        }
      ]
    });
  });

  it('should handle COMPLETE_TODO action', () => {
    const todo = { id: 1, text: 'to-do' };
    const initialState = { completed: [], uncompleted: [todo] };
    
    expect(
      reducer(initialState, {
        type: types.COMPLETE_TODO,
        id: 1,
      })
    ).toEqual({
      completed: [{ ...todo, completed: true }],
      uncompleted: [],
    });
  });

  it('should handle UNCOMPLETE_TODO action', () => {
    const todo = { id: 1, text: 'to-do' };
    const initialState = { completed: [todo], uncompleted: [] };
    
    expect(
      reducer(initialState, {
        type: types.UNCOMPLETE_TODO,
        id: 1,
      })
    ).toEqual({
      completed: [],
      uncompleted: [{ ...todo, completed: false }],
    });
  });

  it('should handle SWAP_TODOS action', () => {
    const firstTodo = { id: 1, text: 'first to-do' };
    const secondTodo = { id: 2, text: 'second to-do' };
    const initialState = {
      completed: [],
      uncompleted: [firstTodo, secondTodo],
    };
    
    expect(
      reducer(initialState, {
        type: types.SWAP_TODOS,
        oldIndex: 0,
        newIndex: 1,
      })
    ).toEqual({
      completed: [],
      uncompleted: [secondTodo, firstTodo],
    });
  });
});
