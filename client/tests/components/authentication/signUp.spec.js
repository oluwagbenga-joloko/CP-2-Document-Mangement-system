import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ConnectedSignUp, { SignUp }
from '../../../src/components/authentication/SignUp';

const mockStore = configureMockStore();
const store = mockStore({
  authReducer: {
    userId: undefined,
    message: ''
  },
  ajaxCallReducer: {
    loading: false
  }
});
const props = {
  loading: false,
  userId: undefined,
  message: undefined,
  signUp: spy(() => new Promise((resolve) => { resolve(); })),
};
let wrapper = mount(
  <Provider store={store}>
    <ConnectedSignUp {...props} />
  </Provider>);

chai.use(chaiEnzyme());
describe('SignUp component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call handlechange on input change', () => {
    wrapper = mount(<SignUp {...props} />);
    const handleChange = spy(wrapper.instance(), 'handleChange');
    wrapper.update();
    let input = wrapper.find('input[id="email"]');
    input.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'test@gmail.com', name: 'email' }
    });
    input = wrapper.find('input[id="password"]');
    input.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'testingtest', name: 'lastName' }
    });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(handleChange.called).to.equal(true);
  });
  it('should show progess bar when loading is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('.progress')).to.be.present();
  });
});

