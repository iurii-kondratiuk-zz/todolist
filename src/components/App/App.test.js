import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {

  it('should be rendered with .App class', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.hasClass('App')).toEqual(true);
  });
});
