import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import UserCard
from '../../../src/components/users/UserCard';
import { user } from '../../testData';

const props = {
  ...user,
  userRoleId: 23,
  roleTitle: 'admin',
  deleteUser: spy(() => new Promise(() => { Promise.resolve(); })),
};
const wrapper = mount(<UserCard {...props} />);

chai.use(chaiEnzyme());
describe('UserCard component', () => {
  it('it renders without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call deleteUser when delete icon is clicked', () => {
    const button = wrapper.find('a[role="button"]');
    button.simulate('click');
    expect(props.deleteUser.called).to.equal(true);
  });
});
