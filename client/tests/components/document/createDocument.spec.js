import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
// import { MemoryRouter } from 'react-router';
import { CreateDocument }
from '../../../src/components/documents/CreateDocument';


const props = {
  user: {
    firstName: 'bolaf',
    lastName: 'yemi',
    email: 'bola@gmail.com',
    id: 20,
  },
  document: {
    title: 'test',
    content: 'test',
    access: 'public',
    userId: 20,
  },
  getDocument: spy(() => new Promise((resolve) => { resolve(); })),
  createDocument: spy(() => new Promise((resolve) => { resolve(); })),
  updateDocument: spy(() => new Promise((resolve) => { resolve(); })),
  history: { push: spy() },
  match: { params: {} }
};
const document = {
  title: 'testing',
  content: 'test',
  access: 'public',
  userId: 20,
};
let wrapper = shallow(<CreateDocument {...props} />);

chai.use(chaiEnzyme());
describe('CreateDocument component', () => {
  it('it renders without crasshing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call change state on on input change', () => {
    const input = wrapper.find('input[id="title"]');
    input.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'testing', name: 'title' } });
    const select = wrapper.find('select');
    select.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'role', name: 'access' } });
    expect(wrapper.state().title).to.equal('testing');
    expect(wrapper.state().access).to.equal('role');
  });
  it('should call createDocument on submit click', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(props.createDocument.called).to.equal(true);
  });
  it('should  call get document on mount when document id is present', () => {
    const newProps = { ...props, match: { params: { id: 2 } } };
    wrapper = shallow(<CreateDocument {...newProps} />);
    expect(props.getDocument.called).to.equal(true);
  });
  it('should show save button if documentownerid is equal to userid', () => {
    wrapper.setProps({ document: props.document });
    wrapper.setProps({ document });
    expect(wrapper.find('button[type="submit"]')).to.be.present();
  });

  it(`should call updateDocument on submit
   click when document id is present`, () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(props.updateDocument.called).to.equal(true);
  });
  it(`should not show save button if 
    documentownerid is not equal to userid`, () => {
    const newDocument = { ...document, userId: 34 };
    wrapper.setProps({ document: newDocument });
    expect(wrapper.find('button[type="submit"]')).not.to.be.present();
  });
});
