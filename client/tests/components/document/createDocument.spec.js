import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { CreateDocument }
from '../../../src/components/documents/CreateDocument';
import { document, user } from '../../testData';


const props = {
  user,
  document,
  getDocument: spy(() => new Promise((resolve) => { resolve(); })),
  createDocument: spy(() => new Promise((resolve) => { resolve(); })),
  updateDocument: spy(() => new Promise((resolve) => { resolve(); })),
  history: { push: spy() },
  match: { params: {} }
};
let wrapper = shallow(<CreateDocument {...props} />);

chai.use(chaiEnzyme());
describe('CreateDocument Component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should change state on input change', () => {
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
  it('should  call getdocument on mount when document id is present', () => {
    const newProps = { ...props, match: { params: { id: 2 } } };
    wrapper = shallow(<CreateDocument {...newProps} />);
    expect(props.getDocument.called).to.equal(true);
  });
  it('should show save button if documentownerid is equal to userid', () => {
    wrapper.setProps({ document: props.document });
    wrapper.setProps({ document: { ...document, title: 'testing' } });
    expect(wrapper.find('button[type="submit"]')).to.be.present();
  });

  it(`should call updateDocument on submit
   click when document id is present`, () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(props.updateDocument.called).to.equal(true);
  });
  it(`should not show save button if 
    documentOwnerId is not equal to userId`, () => {
    const newDocument = { ...document, userId: 34 };
    wrapper.setProps({ document: newDocument });
    expect(wrapper.find('button[type="submit"]')).not.to.be.present();
  });
});
