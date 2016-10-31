import * as TodoActions from '../actions';
import * as types from '../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a to-do', () => {
  	const text = 'my first todo';
    const expectedAction = {
      type: types.ADD_TODO,
    	id: 0,
      text,
    }
    expect(TodoActions.addTodo(text)).toEqual(expectedAction)
  });


  it('should create an action to complete a to-do', () => {
  	const id = 1;
    const expectedAction = {
      type: types.COMPLETE_TODO,
    	id,
    }
    expect(TodoActions.completeTodo(id)).toEqual(expectedAction)
  });

  it('should create an action to uncomplete a to-do', () => {
  	const id = 1;
    const expectedAction = {
      type: types.UNCOMPLETE_TODO,
    	id,
    }
    expect(TodoActions.uncompleteTodo(id)).toEqual(expectedAction)
  });

  it('should create an action to swap to-dos', () => {
  	const indexes = {
  		oldIndex: 0,
  		newIndex: 1,
  	};
    const expectedAction = {
      type: types.SWAP_TODOS,
    	...indexes,
    }
    expect(TodoActions.swapTodos(indexes)).toEqual(expectedAction)
  });
});
