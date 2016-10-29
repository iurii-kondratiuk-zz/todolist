import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
	it('should render correct title', () => {
		const title = 'Inbox';
	  const wrapper = shallow(<Header title={title} />);
	  expect(wrapper.text()).toEqual(title);
	});
});
