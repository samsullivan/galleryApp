import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';
import ReactModal from 'react-modal';

describe('<Gallery />', () => {

  it('should render Gallery class', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.find('.Gallery')).toHaveLength(1);
  });

  it('should render <ReactModal /> component', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.find(ReactModal)).toHaveLength(1);
  });

});
