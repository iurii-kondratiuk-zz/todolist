import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {

  it('should be rendered as disabled', () => {
    const wrapper = shallow(<Button disabled={true} />);
    expect(wrapper.find('button[disabled]').length).toEqual(1);
  });

  it('should be rendered as not disabled', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button[disabled]').length).toEqual(0);
  });

  it('should render text', () => {
    const text = 'Button action';
    const wrapper = shallow(<Button text={text} />);
    expect(wrapper.text()).toEqual(text);
  });

  it('should call a callback upon click', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Button onClick={callback} />);
    wrapper.find('.Button').simulate('click');
    expect(callback.mock.calls.length).toEqual(1);
  });
});
