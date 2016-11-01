import * as utils from '../utils';

describe('utils', () => {
  it('getTodos', () => {
    const state = {
      todosById: {
        1: { text: 'todo 1' },
        2: { text: 'todo 2' },
        3: { text: 'todo 3' },
      },
      inbox: [1, 2],
    };

    expect(utils.getTodos(state, 'inbox')).toEqual(
      [{ text: 'todo 1' }, { text: 'todo 2' }]
    );
  });
});
