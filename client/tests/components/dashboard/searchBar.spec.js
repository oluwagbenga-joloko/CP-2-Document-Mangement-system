import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { SearchBar } from '../../../src/components/dashboard/SearchBar';

const props = {
  query: 'testing',
  access: 'public',
  url: 'dashboard',
  history: { replace: spy() }
};
const wrapper = mount(<SearchBar {...props} />);
const handleChange = spy(wrapper.instance(), 'handleChange');
const handleSubmit = spy(wrapper.instance(), 'handleSubmit');
wrapper.update();

chai.use(chaiEnzyme());
describe('SearchBar component', () => {
  it('should render without crashing', () => {
    expect(true).to.equal(true);
    expect(wrapper).to.be.present();
  });
  it('should call handleChange on input change', () => {
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'testing', name: 'query' } });
    expect(input.props().value).to.equal('testing');
    expect(handleChange.called).to.equal(true);
  });
  it('should call handleSubmit on form submit', () => {
    const button = wrapper.find('button[type="submit"]');
    wrapper.update();
    button.simulate('submit');
    expect(handleSubmit.called).to.equal(true);
  });
});
