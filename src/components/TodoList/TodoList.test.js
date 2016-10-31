import React from 'react';
import { mount } from 'enzyme';

import TodoList from './TodoList';

describe('<TodoList />', () => {

  it('should render children', () => {
    const children = 'TodoList children';
    const wrapper = mount(<TodoList>{children}</TodoList>);
    expect(wrapper.text()).toEqual(children);
  });
});
