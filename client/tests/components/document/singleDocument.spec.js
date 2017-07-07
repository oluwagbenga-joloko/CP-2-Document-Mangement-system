import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { SingleDocument }
from '../../../src/components/documents/SingleDocument';

const document = {
  title: 'test',
  content: 'test',
  access: 'public',
  userId: 201,
};
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
  match: { params: { id: 12 }

  },
  getDocument: spy(id => new Promise((resolve) => { resolve(id); })),
};
let wrapper = mount(
  <MemoryRouter><SingleDocument {...props} /></MemoryRouter>);

chai.use(chaiEnzyme());
describe('SingleDocument component', () => {
  it('should renders without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call getDocument on mount', () => {
    expect(props.getDocument.called).to.equal(true);
  });
  it('it should show edit button when ownerid is equal to userId', () => {
    expect(wrapper.find('.save-btn')).to.be.present();
  });
  it(`it should not show edit button when
   ownerid not is equal to userId`, () => {
    const newProps = { ...props, document };
    wrapper = mount(
      <MemoryRouter><SingleDocument {...newProps} /></MemoryRouter>);
    expect(wrapper.find('.save-btn')).not.to.be.present();
  });
});
