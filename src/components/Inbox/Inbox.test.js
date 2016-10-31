import React from 'react';
import { shallow } from 'enzyme';

import Inbox from './Inbox';

describe('<Inbox />', () => {

  it('should be rendered with .Inbox class', () => {
    const wrapper = shallow(<Inbox />);
    expect(wrapper.hasClass('Inbox')).toEqual(true);
  });
});
