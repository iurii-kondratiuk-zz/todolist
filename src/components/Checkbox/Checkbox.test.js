import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('should be rendered unchecked', () => {
    const wrapper = shallow(<Checkbox checked={false} />);
    expect(wrapper.hasClass('Checkbox--checked')).toEqual(false);
  });

  it('should be rendered checked', () => {
    const wrapper = shallow(<Checkbox checked={true} />);
    expect(wrapper.hasClass('Checkbox--checked')).toEqual(true);
  });

  it('should call a callback upon click', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Checkbox checked={false} onChange={callback} />);
    wrapper.find('.Checkbox').simulate('click');
    expect(callback.mock.calls.length).toEqual(1);
  });
});
