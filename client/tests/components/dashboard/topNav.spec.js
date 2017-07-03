import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import TopNav from '../../../src/components/dashboard/TopNav';

const wrapper = mount(<TopNav />);

chai.use(chaiEnzyme());
describe('TopNav component', () => {
  it('it renders without crashing', () => {
    expect(wrapper).to.be.present();
  });
  // it('it should contain the right with text "DocumentIt"', () => {
  //   expect(wrapper.find('#logo1')).to.have.text('Document');
  //   expect(wrapper.find('#logo2')).to.not.have.text('it');
  // });
});
