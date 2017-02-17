import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Gallery from './Gallery';

describe('<App />', () => {
  
  it('should render App class', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).toHaveLength(1);
  });

  it('should render <Gallery /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Gallery)).toHaveLength(1);
  });

});
