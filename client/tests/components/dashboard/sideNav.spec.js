import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import sinon from 'sinon';
import { mount } from 'enzyme';
import SideNav from '../../../src/components/dashboard/SideNav';
import { user } from '../../testData';

const props = {
  url: 'dashboard',
  user,
  logout: sinon.spy(() => new Promise(() => { Promise.resolve(); }))
};
const wrapper = mount(<MemoryRouter><SideNav {...props} /></MemoryRouter>);
chai.use(chaiEnzyme());
describe('SideNav component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call logout function when logout link is clicked', () => {
    const button = wrapper.find('.logout');
    button.simulate('click');
    expect(props.logout.called).to.equal(true);
  });
});
