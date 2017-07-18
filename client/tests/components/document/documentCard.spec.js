import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import DocumentCard
from '../../../src/components/documents/DocumentCard';
import { document } from '../../testData';

const props = {
  ...document,
  ownerId: 20,
  deleteDocument: sinon.spy(() => new Promise(() => { Promise.resolve(); })),
};
const wrapper = mount(<DocumentCard {...props} />);

chai.use(chaiEnzyme());
describe('DocumentCard component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
  it('should call deleteDocument when delete icon is clicked', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleDelete');
    wrapper.update();
    const button = wrapper.find('a[role="button"]');
    button.simulate('click');
    wrapper.update();
    expect(spy.called).to.equal(true);
  });
});
