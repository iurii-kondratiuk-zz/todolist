import React from 'react';
import { mount } from 'enzyme';

import SortableTodoList from './SortableTodoList';

describe('<SortableTodoList />', () => {

  it('should render children', () => {
    const children = 'SortableTodoList children';
    const wrapper = mount(<SortableTodoList>{children}</SortableTodoList>);
    expect(wrapper.text()).toEqual(children);
  });
});
