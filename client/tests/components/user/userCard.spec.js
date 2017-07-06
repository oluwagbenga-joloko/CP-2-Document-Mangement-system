import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
// import { MemoryRouter } from 'react-router';
import UserCard
from '../../../src/components/users/UserCard';

const props = {
  firstName: 'test',
  lastName: 'test',
  email: 'public',
  userId: 20,
  id: 10,
  userRoleId: 23,
  roleTitle: 'admin',
  deleteUser: spy(() => new Promise(() => { Promise.resolve(); })),
};
const wrapper = mount(<UserCard {...props} />);

chai.use(chaiEnzyme());
describe('UserCard component', () => {
  it('it renders without crasshing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call deleteUser when delete icon is clicked', () => {
    const button = wrapper.find('a[role="button"]');
    button.simulate('click');
    expect(props.deleteUser.called).to.equal(true);
  });
});
