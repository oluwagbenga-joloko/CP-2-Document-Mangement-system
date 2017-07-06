import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
// import { MemoryRouter } from 'react-router';
import ConnectedEditprofile, { EditProfile }
from '../../../src/components/users/EditProfile';

const mockStore = configureMockStore(),
  store = mockStore({
    userReducer: {
      currentUser: {
        firstName: 'test',
        lastName: 'test',
        email: 'public',
        userId: 20,
        id: 10,
        roleId: 23,
      },
    }
  });
const props = {
  user: {
    firstName: 'test',
    lastName: 'test',
    email: 'public',
    userId: 20,
    id: 10,
    roleId: 23,
  },
  getCurrentUser: spy(() => new Promise((resolve) => { resolve(); })),
  updateUser: spy(() => new Promise((resolve) => { resolve(); })),
};
let wrapper = mount(
  <Provider store={store}>
    <ConnectedEditprofile {...props} />
  </Provider>);

chai.use(chaiEnzyme());
describe('UserCard component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('it should call handle change on handlechange on input change', () => {
    wrapper = mount(<EditProfile {...props} />);
    const handleChange = spy(wrapper.instance(), 'handleChange');
    wrapper.update();
    let input = wrapper.find('input[id="email"]');
    input.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'testing@test.com', name: 'email' }
    });
    input = wrapper.find('input[id="last_name"]');
    input.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'testingtest', name: 'lastName' }
    });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(handleChange.called).to.equal(true);
  });
});

