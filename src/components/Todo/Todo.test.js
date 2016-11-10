import React from 'react';
import { shallow } from 'enzyme';

import Todo from './Todo';

describe('<Todo />', () => {

  it('should render to-do text', () => {
    const todo = { title: 'my first todo' };
    const wrapper = shallow(<Todo todo={todo} />);
    expect(wrapper.find('span').text()).toEqual(todo.title);
  });

  it('should be rendered as completed', () => {
    const todo = { completed: true };
    const wrapper = shallow(<Todo todo={todo} />);
    expect(wrapper.find('.Todo--completed').length).toEqual(1);
  });

  it('shouldn't render loading indicator', () => {
    const wrapper = shallow(<Todo todo={{}} />);
    expect(wrapper.find('.Todo-loading').length).toEqual(0);
  });

  it('should render loading indicator', () => {
    const wrapper = shallow(<Todo inProcess={true} todo={{}} />);
    expect(wrapper.find('.Todo-loading').length).toEqual(1);
  });
});
