import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as TodoActions from '../actions';
import * as types from '../constants/ActionTypes';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {

  describe('async', () => {
    afterEach(() => { nock.cleanAll(); });
    
    it('should create an action to fetch to-dos', () => {
      const mockData = {
        todos: [{ title: 'new to-do' }],
        listId: 1,
        todoPositions: { values: [1] },
      };
      nock('http://localhost:3000/')
        .get('/todos')
        .reply(200, mockData);

      const store = mockStore({ });
      const expectedActions = [
        { type: types.REQUEST_TODOS, completed: true },
        { type: types.RECEIVE_TODOS, ...mockData }
      ];

      store.dispatch(TodoActions.fetchTodos({ completed: true }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to add a to-do', () => {
      nock('http://localhost:3000/')
        .post('/todos')
        .reply(200, { title: 'new to-do' });

      const store = mockStore({ });
      const expectedActions = [{ type: types.ADD_TODO, todo: { title: 'new to-do' } }];

      store.dispatch(TodoActions.addTodo(1, 'new to-do'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to complete a to-do', () => {
      const responseTodo = { title: 'new to-do', completed: true }; 
      nock('http://localhost:3000/')
        .put('/todos/1')
        .reply(200, responseTodo);

      const store = mockStore({ });
      const expectedActions = [
        { type: types.COMPLETE_TODO, todo: responseTodo }
      ];

      store.dispatch(TodoActions.completeTodo({ id: 1, revision: 0 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to uncomplete a to-do', () => {
      const responseTodo = { title: 'new to-do', completed: true }; 
      nock('http://localhost:3000/')
        .put('/todos/1')
        .reply(200, responseTodo);

      const store = mockStore({ });
      const expectedActions = [
        { type: types.UNCOMPLETE_TODO, todo: responseTodo }
      ];

      store.dispatch(TodoActions.uncompleteTodo({ id: 1, revision: 0 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create an action to swap to-dos', () => {
      nock('http://localhost:3000/')
        .put('/swapTodos')
        .reply(200, { data: { revision: 1, values: [1, 2] }});

      const store = mockStore({ });
      const expectedActions = [
        { type: types.SWAP_TODOS, revision: 1, values: [1, 2] },
        { type: types.SWAP_TODOS, revision: 1, values: [1, 2] },
      ];

      store.dispatch(TodoActions.swapTodos([2, 1], 123, 0, { newIndex: 1, oldIndex: 0 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  it('should create an action to toggle completed to-dos', () => {
    const expectedAction = {
      type: types.TOGGLE_COMPLETED_TODOS,
    };
    expect(TodoActions.toggleCompletedTodos()).toEqual(expectedAction)
  });

  it('should create an action to request to-dos', () => {
    const expectedAction = {
      type: types.REQUEST_TODOS,
      completed: true,
    };
    expect(TodoActions.requestTodos(true)).toEqual(expectedAction)
  });

  it('should create an action to request to-do update', () => {
    const expectedAction = {
      type: types.REQUEST_TODO_UPDATE,
      id: 1,
    };
    expect(TodoActions.requestTodoUpdate(1)).toEqual(expectedAction)
  });
});
