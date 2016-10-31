import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('<Input />', () => {

  it('should render an input with placeholder', () => {
    const placeholder = 'Add a to-do...';
    const wrapper = shallow(<Input placeholder={placeholder} />);
    expect(wrapper.find('input').prop('placeholder')).toEqual(placeholder);
  });

  it('should call a callback upon ENTER press', () => {
    const callback = jest.fn();
    const value = 'value';
    const wrapper = shallow(<Input onSave={callback} />);
    wrapper.find('input').simulate('change', { target: { value } });
    wrapper.find('input').simulate('keyDown', { which: 13 });
    expect(callback.mock.calls.length).toEqual(1);
  });

  it('shouldn\'t call a callback upon ENTER change if value is empty', () => {
    const callback = jest.fn();
    const value = '';
    const wrapper = shallow(<Input onSave={callback} />);
    wrapper.find('input').simulate('change', { target: { value } });
    wrapper.find('input').simulate('keyDown', { which: 13 });
    expect(callback.mock.calls.length).toEqual(0);
  });
});
