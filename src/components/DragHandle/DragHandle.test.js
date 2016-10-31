import React from 'react';
import { mount } from 'enzyme';

import DragHandle from './DragHandle';

describe('<DragHandle />', () => {

  it('should render children', () => {
    const children = 'DragHandle children';
    const wrapper = mount(<DragHandle>{children}</DragHandle>);
    expect(wrapper.text()).toEqual(children);
  });
});
