import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import TopNav from '../../../src/components/dashboard/TopNav';

const wrapper = mount(<TopNav />);

chai.use(chaiEnzyme());
describe('TopNav component', () => {
  it('should render without crashing', () => {
    expect(wrapper).to.be.present();
  });
});
