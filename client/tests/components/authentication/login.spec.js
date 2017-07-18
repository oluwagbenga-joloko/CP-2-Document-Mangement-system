import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ConnectedLogin, { Login }
from '../../../src/components/authentication/Login';


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
  login: spy(() => new Promise((resolve) => { resolve(); })),
};
let wrapper = mount(
  <Provider store={store}>
    <ConnectedLogin {...props} />
  </Provider>);

chai.use(chaiEnzyme());
describe('Login component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call handle change on handlechange on input change', () => {
    wrapper = mount(<Login {...props} />);
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
      target: { value: 'testingtest', name: 'password' }
    });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(handleChange.called).to.equal(true);
  });
  it('should show progess bar when loading is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('.progress')).to.be.present();
  });
});

