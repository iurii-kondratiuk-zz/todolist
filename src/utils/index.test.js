import * as utils from '../utils';

describe('utils', () => {
  it('moveAndUpdate', () => {
    const state = {
      old: [{ id: 1 }],
      new: [],
    };

    expect(utils.moveAndUpdate(state, 1, 'old', 'new', { new: true })).toEqual({
      old: [],
      new: [{ id: 1, new: true }],
    });
  });
});
