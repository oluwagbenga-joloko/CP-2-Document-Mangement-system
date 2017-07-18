import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Dashboard } from
'../../../src/components/dashboard/Dashboard';

const props = {
  userId: 12,
  match: { url: '/dashboard' },
  logout: sinon.spy(() => new Promise(() => { Promise.resolve(); })),
  getCurrentUser: sinon.spy(() => new Promise(() => { Promise.resolve(); }))
};
let wrapper;
let newProps;

chai.use(chaiEnzyme());
describe('Dashboard component', () => {
  it('should render without crashing', () => {
    wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).to.be.present();
  });
  it('should not render elements if userId is undefined ', () => {
    newProps = { ...props, userId: undefined };
    wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper.find('TopNav')).not.to.be.present();
  });
  it('should render right elements', () => {
    newProps = { ...props, user: { firstName: 'test', lastName: 'test' } };
    wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper).to.be.present();
    expect(wrapper.find('main')).to.be.present();
  });
});
