import React from 'react';
import { shallow } from 'enzyme';

import Todo from './Todo';

describe('<Todo />', () => {

  it('should render to-do text', () => {
    const todo = { text: 'my first todo' };
    const wrapper = shallow(<Todo todo={todo} />);
    expect(wrapper.find('span').text()).toEqual(todo.text);
  });

  it('should be rendered as completed', () => {
    const todo = { completed: true };
    const wrapper = shallow(<Todo todo={todo} />);
    expect(wrapper.find('.Todo--completed').length).toEqual(1);
  });
});
