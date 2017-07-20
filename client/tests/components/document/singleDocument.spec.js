import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { SingleDocument }
from '../../../src/components/documents/SingleDocument';
import { document, user, match } from '../../testData';

const props = {
  user,
  document,
  match,
  getDocument: spy(id => new Promise((resolve) => { resolve(id); })),
};
let wrapper = mount(
  <MemoryRouter><SingleDocument {...props} /></MemoryRouter>);

chai.use(chaiEnzyme());
describe('SingleDocument component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call getDocument on mount', () => {
    expect(props.getDocument.called).to.equal(true);
  });
  it('should show edit button when ownerId is equal to userId', () => {
    expect(wrapper.find('.save-btn')).to.be.present();
  });
  it(`should not show edit button when
   ownerId not is equal to userId`, () => {
    const newProps = { ...props, document };
    wrapper = mount(
      <MemoryRouter><SingleDocument {...newProps} /></MemoryRouter>);
    expect(wrapper.find('.save-btn')).not.to.be.present();
  });
});
