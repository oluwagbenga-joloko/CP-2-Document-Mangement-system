import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { AllUsers }
from '../../../src/components/users/AllUsers';
import { users, pagination, location } from '../../testData';

const props = {
  users,
  pagination,
  location,
  loading: false,
  searchUser: sinon.spy(() => new Promise((resolve) => { resolve(); })),
  deleteUser: sinon.spy(() => new Promise((resolve) => { resolve(); })),
  history: { replace: sinon.spy() }
};
let wrapper;

wrapper = shallow(<AllUsers {...props} />);
chai.use(chaiEnzyme());
describe('GeneralDocuments component', () => {
  it('should renders without crashing and ', () => {
    expect(wrapper).to.be.present();
  });
  it('calls update searchDocuments action on mount', () => {
    expect(props.searchUser.called).to.equal(true);
  });
  it('should call search user on location.search change', () => {
    wrapper.setProps({ location: {
      search: '?query=test&page=3',
      pathname: ''
    }, });
    wrapper.update();
    expect(props.searchUser.calledTwice).to.equal(true);
  });
  it(`should set query to "" if location.search 
  is empty on props change`, () => {
    wrapper.setProps({ location: {
      search: '',
      pathname: ''
    }, });
    wrapper.update();
    expect(wrapper.instance().state.query).to.eql('');
  });
  it('should change state.users on props.users change', () => {
    wrapper.setProps({ users });
    expect(wrapper.instance().state.users).to.eql(users);
  });
  it(`should set state.query to "" 
  if location.search is empty on mount`, () => {
    const newProps = {
      ...props,
      location: { search: '', pathname: '' },
    };
    wrapper = shallow(<AllUsers {...newProps} />);
    expect(wrapper.instance().state.query).to.eql('');
    expect(wrapper.find('.progress')).not.to.be.present();
  });
  it('should show progess bar when loading is true', () => {
    wrapper.setProps({ loading: false, users: [] });
    wrapper.setProps({ loading: true });
    expect(wrapper.find('.progress')).to.be.present();
  });
});

